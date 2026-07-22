import type { CSSProperties } from "react";
import type {
  StudioState,
  GradientLayer,
  PatternType,
} from "@/types/studio";
import type { Gradient } from "@/types";
import { DEFAULT_MESH_POINTS } from "@/types/studio";
import { GRADIENTS } from "@/data/gradients";

function hexToRgba(hex: string, alpha: number): string {
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  // Non-hex input (e.g. a named color) can't be folded into rgba(); pass it
  // through unchanged rather than emitting rgba(NaN,…) and rendering nothing.
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return hex;
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// CSS has no native mesh-gradient(); simulate it by stacking soft radial
// gradients that fade to transparent, letting overlaps blend into a mesh.
const MESH_FALLOFF = 55;

function buildGradientValue(g: GradientLayer): string {
  if (g.type === "mesh") {
    const points = g.meshPoints ?? DEFAULT_MESH_POINTS;
    return points
      .map(
        (p) =>
          `radial-gradient(at ${p.x}% ${p.y}%, ${p.color} 0px, transparent ${MESH_FALLOFF}%)`
      )
      .join(", ");
  }

  const stops = g.stops
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");

  switch (g.type) {
    case "linear":
      return `linear-gradient(${g.angle}deg, ${stops})`;
    case "radial":
      return `radial-gradient(circle at center, ${stops})`;
    case "conic":
      return `conic-gradient(from ${g.angle}deg at center, ${stops})`;
  }
}

// A mesh emits N comma-separated radial layers, so its background-size must
// list N matching entries to stay index-aligned with the image list.
function buildGradientSize(g: GradientLayer, animated: boolean): string {
  const size = animated && g.type !== "mesh" ? "400% 400%" : "100% 100%";
  if (g.type === "mesh") {
    const count = (g.meshPoints ?? DEFAULT_MESH_POINTS).length;
    return Array.from({ length: count }, () => size).join(", ");
  }
  return size;
}

export function buildPatternValue(
  type: PatternType,
  color: string,
  opacity: number
): string {
  const c = hexToRgba(color, opacity);

  switch (type) {
    case "dots":
      return `radial-gradient(circle, ${c} 1px, transparent 1px)`;
    case "grid":
      return `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`;
    case "lines":
      return `linear-gradient(${c} 1px, transparent 1px)`;
    case "diagonal":
      return `repeating-linear-gradient(45deg, transparent, transparent 10px, ${c} 10px, ${c} 11px)`;
    case "checkerboard":
      return `conic-gradient(${c} 25%, transparent 25%, transparent 50%, ${c} 50%, ${c} 75%, transparent 75%)`;
    case "crosses": {
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path d='M10 7v6M7 10h6' stroke='${c}' stroke-width='1.5'/></svg>`;
      return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    }
  }
}

export function buildPatternSize(type: PatternType, size: number): string {
  switch (type) {
    case "dots":
      return `${size}px ${size}px`;
    case "grid":
      return `${size}px ${size}px, ${size}px ${size}px`;
    case "lines":
      return `100% ${size}px`;
    case "diagonal":
      return "auto";
    case "checkerboard":
      return `${size}px ${size}px`;
    case "crosses":
      return `${size}px ${size}px`;
  }
}

export function buildNoiseValue(intensity: number, opacity: number): string {
  const freq = (intensity * 0.8).toFixed(2);
  const op = opacity.toFixed(2);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='4' stitchTiles='stitch'/></filter><rect width='300' height='300' filter='url(%23n)' opacity='${op}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// Index-aligned background-image / background-size lists shared by the CSS,
// Tailwind, and preview outputs. Stack order: pattern (top) → gradient.
function buildLayerStack(state: StudioState): { images: string[]; sizes: string[] } {
  const images: string[] = [];
  const sizes: string[] = [];

  if (state.pattern.enabled) {
    images.push(
      buildPatternValue(state.pattern.type, state.pattern.color, state.pattern.opacity)
    );
    // Always push a size so sizes stays index-aligned with images.
    sizes.push(buildPatternSize(state.pattern.type, state.pattern.size));
  }

  if (state.gradient.enabled) {
    images.push(buildGradientValue(state.gradient));
    sizes.push(
      buildGradientSize(
        state.gradient,
        state.animation.enabled && !!state.animation.presetId
      )
    );
  }

  return { images, sizes };
}

function resolveAnimation(
  state: StudioState
): { name: string; duration: string; preset: Gradient } | null {
  if (!state.animation.enabled || !state.animation.presetId) return null;
  const preset = GRADIENTS.find((g) => g.id === state.animation.presetId);
  if (!preset) return null;
  const parts = preset.style.animation.split(" ");
  const name = parts[0] ?? "";
  const duration = (parseFloat(parts[1] || "8") / state.animation.speed).toFixed(1);
  return { name, duration, preset };
}

export function generateCSS(state: StudioState): string {
  const lines: string[] = [".background {"];

  // Noise is emitted as a static ::after overlay (see below), so the main
  // element needs a positioning context for it.
  if (state.noise.enabled) {
    lines.push("  position: relative;");
  }

  if (state.baseColor.enabled) {
    lines.push(`  background-color: ${state.baseColor.color};`);
  }

  const { images: bgImages, sizes: bgSizes } = buildLayerStack(state);

  if (bgImages.length > 0) {
    if (bgImages.length === 1) {
      lines.push(`  background-image: ${bgImages[0]};`);
    } else {
      lines.push(`  background-image:`);
      bgImages.forEach((img, i) => {
        const comma = i < bgImages.length - 1 ? "," : ";";
        lines.push(`    ${img}${comma}`);
      });
    }
    if (bgSizes.length > 0) {
      lines.push(`  background-size: ${bgSizes.join(", ")};`);
    }
  }

  const anim = resolveAnimation(state);
  if (anim) {
    lines.push(
      `  animation: ${anim.name} ${anim.duration}s ease infinite ${state.animation.direction};`
    );
  }

  lines.push("}");

  // Static grain overlay — mirrors the preview, and keeps noise out of the
  // animated background-image stack so it never pans with the gradient.
  if (state.noise.enabled) {
    lines.push("");
    lines.push(".background::after {");
    lines.push('  content: "";');
    lines.push("  position: absolute;");
    lines.push("  inset: 0;");
    lines.push("  pointer-events: none;");
    lines.push(
      `  background-image: ${buildNoiseValue(state.noise.intensity, state.noise.opacity)};`
    );
    lines.push("  background-size: 300px 300px;");
    lines.push("}");
  }

  if (anim) {
    lines.push("");
    lines.push(anim.preset.keyframes);
  }

  return lines.join("\n");
}

// Tailwind arbitrary-value equivalent of generateCSS. Layered gradient
// backgrounds don't map to named utilities, so we emit `bg-[...]` arbitrary
// values (spaces underscore-escaped per Tailwind's JIT syntax). The ::after
// noise overlay and @keyframes can't live in a utility class, so those are
// surfaced as notes pointing back at the CSS output.
export function generateTailwind(state: StudioState): string {
  const classes: string[] = [];
  const notes: string[] = [];
  const esc = (v: string) => v.replace(/\s+/g, "_");

  if (state.baseColor.enabled) {
    classes.push(`bg-[${state.baseColor.color}]`);
  }

  const { images: bgImages, sizes: bgSizes } = buildLayerStack(state);

  if (bgImages.length > 0) {
    classes.push(`bg-[image:${esc(bgImages.join(", "))}]`);
    classes.push(`bg-[length:${esc(bgSizes.join(", "))}]`);
  }

  const anim = resolveAnimation(state);
  if (anim) {
    classes.push(
      `animate-[${anim.name}_${anim.duration}s_ease_infinite_${state.animation.direction}]`
    );
    notes.push(
      `<!-- Register the "${anim.name}" keyframes under theme.extend.keyframes in tailwind.config -->`
    );
  }

  if (state.noise.enabled) {
    notes.push(
      "<!-- Noise uses an ::after grain overlay — not a utility class; copy the CSS output for it -->"
    );
  }

  const markup = `<div class="${classes.join(" ")}"></div>`;
  return notes.length > 0 ? `${notes.join("\n")}\n${markup}` : markup;
}

export function computePreviewStyle(state: StudioState): CSSProperties {
  const style: CSSProperties = {};

  if (state.baseColor.enabled) {
    style.backgroundColor = state.baseColor.color;
  }

  const { images: bgImages, sizes: bgSizes } = buildLayerStack(state);

  if (bgImages.length > 0) {
    style.backgroundImage = bgImages.join(", ");
  }
  if (bgSizes.length > 0) {
    style.backgroundSize = bgSizes.join(", ");
  }

  const anim = resolveAnimation(state);
  if (anim) {
    style.animationName = anim.name;
    style.animationDuration = `${anim.duration}s`;
    style.animationTimingFunction = "ease";
    style.animationIterationCount = "infinite";
    style.animationDirection = state.animation.direction;
  }

  return style;
}

export function computeNoiseStyle(
  enabled: boolean,
  intensity: number,
  opacity: number
): CSSProperties {
  if (!enabled) return { display: "none" };
  return {
    backgroundImage: buildNoiseValue(intensity, opacity),
    backgroundSize: "300px 300px",
  };
}
