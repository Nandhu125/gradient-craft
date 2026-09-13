import type { StudioState, GradientLayer, PatternType } from "@/types/studio";
import { DEFAULT_MESH_POINTS } from "@/types/studio";
import { buildNoiseValue } from "@/lib/studio-css";

export type RasterFormat = "image/png" | "image/webp";

const MESH_FALLOFF = 0.55;

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Distance from a point to the farthest canvas corner — the implicit radius of
// a CSS radial-gradient's default "farthest-corner" sizing.
function farthestCorner(px: number, py: number, w: number, h: number): number {
  const dx = Math.max(px, w - px);
  const dy = Math.max(py, h - py);
  return Math.hypot(dx, dy);
}

function paintGradient(
  ctx: CanvasRenderingContext2D,
  g: GradientLayer,
  w: number,
  h: number
) {
  const cx = w / 2;
  const cy = h / 2;

  if (g.type === "mesh") {
    const points = g.meshPoints ?? DEFAULT_MESH_POINTS;
    for (const p of points) {
      const px = (p.x / 100) * w;
      const py = (p.y / 100) * h;
      const r = MESH_FALLOFF * farthestCorner(px, py, w, h);
      const grad = ctx.createRadialGradient(px, py, 0, px, py, r);
      grad.addColorStop(0, p.color);
      grad.addColorStop(1, hexToRgba(p.color, 0));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }
    return;
  }

  let grad: CanvasGradient;
  if (g.type === "linear") {
    // CSS angle: 0deg points up, growing clockwise.
    const a = ((g.angle % 360) * Math.PI) / 180;
    const dx = Math.sin(a);
    const dy = -Math.cos(a);
    const len = Math.abs(w * dx) + Math.abs(h * dy);
    grad = ctx.createLinearGradient(
      cx - (dx * len) / 2,
      cy - (dy * len) / 2,
      cx + (dx * len) / 2,
      cy + (dy * len) / 2
    );
  } else if (g.type === "radial") {
    grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, farthestCorner(cx, cy, w, h));
  } else {
    // Canvas conic starts at 3 o'clock; CSS `from Ndeg` starts at 12 o'clock.
    grad = ctx.createConicGradient(((g.angle - 90) * Math.PI) / 180, cx, cy);
  }
  for (const s of g.stops) {
    grad.addColorStop(Math.min(1, Math.max(0, s.position / 100)), s.color);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function paintPattern(
  ctx: CanvasRenderingContext2D,
  type: PatternType,
  color: string,
  opacity: number,
  size: number,
  w: number,
  h: number
) {
  const c = hexToRgba(color, opacity);
  const s = Math.max(2, size);
  const tile = document.createElement("canvas");
  const tctx = tile.getContext("2d");
  if (!tctx) return;

  const draw = (tw: number, th: number, fn: () => void) => {
    tile.width = tw;
    tile.height = th;
    tctx.clearRect(0, 0, tw, th);
    tctx.fillStyle = c;
    tctx.strokeStyle = c;
    tctx.lineWidth = 1;
    fn();
  };

  switch (type) {
    case "dots":
      draw(s, s, () => {
        tctx.beginPath();
        tctx.arc(s / 2, s / 2, 1, 0, Math.PI * 2);
        tctx.fill();
      });
      break;
    case "lines":
      draw(s, s, () => tctx.fillRect(0, 0, s, 1));
      break;
    case "diagonal":
      draw(15, 15, () => {
        tctx.beginPath();
        tctx.moveTo(0, 15);
        tctx.lineTo(15, 0);
        tctx.stroke();
      });
      break;
    case "checkerboard":
      draw(s, s, () => {
        tctx.fillRect(0, 0, s / 2, s / 2);
        tctx.fillRect(s / 2, s / 2, s / 2, s / 2);
      });
      break;
    case "grid":
    case "crosses":
      draw(s, s, () => {
        tctx.fillRect(0, 0, s, 1);
        tctx.fillRect(0, 0, 1, s);
      });
      break;
  }

  const pattern = ctx.createPattern(tile, "repeat");
  if (!pattern) return;
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, w, h);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

// Paint the full composition onto a native 2D canvas. No <foreignObject>, so
// the canvas is never tainted and can be exported with toBlob/toDataURL.
// Layers paint bottom-to-top: base → gradient → pattern → noise.
async function renderToCanvas(
  state: StudioState,
  width: number,
  height: number
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  if (state.baseColor.enabled) {
    ctx.fillStyle = state.baseColor.color;
    ctx.fillRect(0, 0, width, height);
  }

  if (state.gradient.enabled) {
    paintGradient(ctx, state.gradient, width, height);
  }

  if (state.pattern.enabled) {
    paintPattern(
      ctx,
      state.pattern.type,
      state.pattern.color,
      state.pattern.opacity,
      state.pattern.size,
      width,
      height
    );
  }

  if (state.noise.enabled) {
    // buildNoiseValue returns url("data:image/svg+xml,..."); strip the wrapper.
    const raw = buildNoiseValue(state.noise.intensity, state.noise.opacity);
    const src = raw.slice(raw.indexOf('"') + 1, raw.lastIndexOf('"'));
    const noiseImg = await loadImage(src);
    const noiseTile = ctx.createPattern(noiseImg, "repeat");
    if (noiseTile) {
      ctx.fillStyle = noiseTile;
      ctx.fillRect(0, 0, width, height);
    }
  }

  return canvas;
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function exportRaster(
  state: StudioState,
  format: RasterFormat,
  width = 1920,
  height = 1080
): Promise<void> {
  const canvas = await renderToCanvas(state, width, height);
  const ext = format === "image/webp" ? "webp" : "png";
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), format, 0.92)
  );
  if (!blob) throw new Error("Failed to encode image");
  triggerDownload(blob, `gradient.${ext}`);
}

// Conic gradients have no pure-vector SVG equivalent, so the SVG wraps the
// rendered raster in an <image> — consistent with the PNG/WebP output and
// still a valid, scalable .svg that opens anywhere.
export async function exportSvg(
  state: StudioState,
  width = 1920,
  height = 1080
): Promise<void> {
  const canvas = await renderToCanvas(state, width, height);
  const dataUrl = canvas.toDataURL("image/png");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<image width="${width}" height="${height}" href="${dataUrl}"/>` +
    `</svg>`;
  triggerDownload(
    new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
    "gradient.svg"
  );
}
