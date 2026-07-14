import type { CSSProperties } from "react";
import type {
  StudioState,
  GradientLayer,
  PatternType,
} from "@/types/studio";
import { GRADIENTS } from "@/data/gradients";

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function buildGradientValue(g: GradientLayer): string {
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
    case "crosses":
      return `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`;
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
      return `${size}px ${size}px, ${size}px ${size}px`;
  }
}

export function buildNoiseValue(intensity: number, opacity: number): string {
  const freq = (intensity * 0.8).toFixed(2);
  const op = opacity.toFixed(2);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='4' stitchTiles='stitch'/></filter><rect width='300' height='300' filter='url(%23n)' opacity='${op}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function generateCSS(state: StudioState): string {
  const lines: string[] = [".background {"];

  if (state.baseColor.enabled) {
    lines.push(`  background-color: ${state.baseColor.color};`);
  }

  const bgImages: string[] = [];
  const bgSizes: string[] = [];

  if (state.noise.enabled) {
    bgImages.push(buildNoiseValue(state.noise.intensity, state.noise.opacity));
    bgSizes.push("300px 300px");
  }

  if (state.pattern.enabled) {
    bgImages.push(
      buildPatternValue(state.pattern.type, state.pattern.color, state.pattern.opacity)
    );
    // Always push a size so bgSizes stays index-aligned with bgImages.
    bgSizes.push(buildPatternSize(state.pattern.type, state.pattern.size));
  }

  if (state.gradient.enabled) {
    bgImages.push(buildGradientValue(state.gradient));
    bgSizes.push(
      state.animation.enabled && state.animation.presetId
        ? "400% 400%"
        : "100% 100%"
    );
  }

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

  if (state.animation.enabled && state.animation.presetId) {
    const preset = GRADIENTS.find((g) => g.id === state.animation.presetId);
    if (preset) {
      const parts = preset.style.animation.split(" ");
      const name = parts[0];
      const origDur = parseFloat(parts[1] || "8");
      const dur = (origDur / state.animation.speed).toFixed(1);
      lines.push(
        `  animation: ${name} ${dur}s ease infinite ${state.animation.direction};`
      );
    }
  }

  lines.push("}");

  if (state.animation.enabled && state.animation.presetId) {
    const preset = GRADIENTS.find((g) => g.id === state.animation.presetId);
    if (preset) {
      lines.push("");
      lines.push(preset.keyframes);
    }
  }

  return lines.join("\n");
}

export function computePreviewStyle(state: StudioState): CSSProperties {
  const style: CSSProperties = {};

  if (state.baseColor.enabled) {
    style.backgroundColor = state.baseColor.color;
  }

  const bgImages: string[] = [];
  const bgSizes: string[] = [];

  if (state.pattern.enabled) {
    bgImages.push(
      buildPatternValue(state.pattern.type, state.pattern.color, state.pattern.opacity)
    );
    // Always push a size so bgSizes stays index-aligned with bgImages.
    bgSizes.push(buildPatternSize(state.pattern.type, state.pattern.size));
  }

  if (state.gradient.enabled) {
    bgImages.push(buildGradientValue(state.gradient));
    bgSizes.push(
      state.animation.enabled && state.animation.presetId
        ? "400% 400%"
        : "100% 100%"
    );
  }

  if (bgImages.length > 0) {
    style.backgroundImage = bgImages.join(", ");
  }
  if (bgSizes.length > 0) {
    style.backgroundSize = bgSizes.join(", ");
  }

  if (state.animation.enabled && state.animation.presetId) {
    const preset = GRADIENTS.find((g) => g.id === state.animation.presetId);
    if (preset) {
      const parts = preset.style.animation.split(" ");
      const name = parts[0] ?? "";
      const origDur = parseFloat(parts[1] || "8");
      const dur = origDur / state.animation.speed;
      style.animationName = name;
      style.animationDuration = `${dur.toFixed(1)}s`;
      style.animationTimingFunction = "ease";
      style.animationIterationCount = "infinite";
      style.animationDirection = state.animation.direction;
    }
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
