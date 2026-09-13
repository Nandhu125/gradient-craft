import type { StudioState } from "@/types/studio";

export interface ContrastResult {
  lightRatio: number; // e.g. 8.4
  darkRatio: number;  // e.g. 2.1
  bestMode: "light" | "dark";
  activeRatio: number; // ratio for currently chosen mode
  wcagRating: "AAA" | "AA" | "AA Large" | "Fail";
  isCompliant: boolean;
  scoreLabel: string;
  recommendation: string;
}

/**
 * Parse any CSS hex or rgb/rgba string into [r, g, b] in range [0, 255].
 */
export function parseColorToRgb(color: string): [number, number, number] {
  const clean = color.trim().toLowerCase();

  // Hex format: #rgb, #rgba, #rrggbb, #rrggbbaa
  if (clean.startsWith("#")) {
    const hex = clean.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return [isNaN(r) ? 0 : r, isNaN(g) ? 0 : g, isNaN(b) ? 0 : b];
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return [isNaN(r) ? 0 : r, isNaN(g) ? 0 : g, isNaN(b) ? 0 : b];
    }
  }

  // RGB/RGBA format: rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = clean.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10),
      parseInt(rgbMatch[2], 10),
      parseInt(rgbMatch[3], 10),
    ];
  }

  // Fallback default dark
  return [15, 23, 42];
}

/**
 * Calculates relative luminance according to WCAG 2.1 standards.
 * Range: 0.0 (deepest black) to 1.0 (pure white).
 */
export function calculateRelativeLuminance(r: number, g: number, b: number): number {
  const srgb = [r, g, b].map((val) => {
    const c = val / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/**
 * Calculates contrast ratio between two relative luminances.
 * Formula: (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter of the two.
 * Range: 1.0 to 21.0.
 */
export function calculateContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 10) / 10;
}

const LIGHT_TEXT_LUMINANCE = calculateRelativeLuminance(255, 255, 255); // ~1.0
const DARK_TEXT_LUMINANCE = calculateRelativeLuminance(15, 23, 42);     // ~0.013

/**
 * Analyze contrast across all colors present in the StudioState (or a raw list of colors).
 */
export function analyzeStudioContrast(
  state: StudioState,
  currentMode: "light" | "dark" = "light"
): ContrastResult {
  const colors: string[] = [];

  if (state.baseColor.enabled && state.baseColor.color) {
    colors.push(state.baseColor.color);
  }

  if (state.gradient.enabled) {
    if (state.gradient.type === "mesh" && state.gradient.meshPoints) {
      state.gradient.meshPoints.forEach((p) => colors.push(p.color));
    } else if (state.gradient.stops) {
      state.gradient.stops.forEach((s) => colors.push(s.color));
    }
  }

  if (colors.length === 0) {
    colors.push("#0e0e0f");
  }

  return analyzeColorsContrast(colors, currentMode);
}

/**
 * Given a list of hex/rgb colors representing a background, evaluates worst-case
 * and average contrast against standard light and dark typography.
 */
export function analyzeColorsContrast(
  colors: string[],
  currentMode: "light" | "dark" = "light"
): ContrastResult {
  const luminances = colors.map((c) => {
    const [r, g, b] = parseColorToRgb(c);
    return calculateRelativeLuminance(r, g, b);
  });

  // Calculate ratios for all sample colors against light and dark text
  const lightRatios = luminances.map((lum) =>
    calculateContrastRatio(LIGHT_TEXT_LUMINANCE, lum)
  );
  const darkRatios = luminances.map((lum) =>
    calculateContrastRatio(lum, DARK_TEXT_LUMINANCE)
  );

  // Worst-case (minimum) ratio across the background surface
  const minLightRatio = Math.min(...lightRatios);
  const minDarkRatio = Math.min(...darkRatios);

  // Average ratio
  const avgLightRatio =
    Math.round(
      (lightRatios.reduce((acc, v) => acc + v, 0) / lightRatios.length) * 10
    ) / 10;
  const avgDarkRatio =
    Math.round(
      (darkRatios.reduce((acc, v) => acc + v, 0) / darkRatios.length) * 10
    ) / 10;

  const bestMode: "light" | "dark" = minLightRatio >= minDarkRatio ? "light" : "dark";
  const activeRatio = currentMode === "light" ? minLightRatio : minDarkRatio;

  let wcagRating: "AAA" | "AA" | "AA Large" | "Fail";
  let scoreLabel: string;
  let isCompliant = true;

  if (activeRatio >= 7.0) {
    wcagRating = "AAA";
    scoreLabel = "WCAG AAA Pass";
  } else if (activeRatio >= 4.5) {
    wcagRating = "AA";
    scoreLabel = "WCAG AA Pass";
  } else if (activeRatio >= 3.0) {
    wcagRating = "AA Large";
    scoreLabel = "Large Text Only";
  } else {
    wcagRating = "Fail";
    scoreLabel = "Low Contrast";
    isCompliant = false;
  }

  let recommendation = "";
  if (wcagRating === "AAA") {
    recommendation = `Optimal readability (${activeRatio}:1). Text is exceptionally legible.`;
  } else if (wcagRating === "AA") {
    recommendation = `Good body text readability (${activeRatio}:1). Meets standard accessibility guidelines.`;
  } else if (wcagRating === "AA Large") {
    recommendation = `Passes for headlines/badges (≥18pt), but body text may be hard to read. Consider toggling to ${
      currentMode === "light" ? "dark" : "light"
    } text.`;
  } else {
    recommendation = `Insufficient contrast (${activeRatio}:1). Switch to ${
      currentMode === "light" ? "Dark text" : "Light text"
    } or adjust background stops.`;
  }

  return {
    lightRatio: avgLightRatio,
    darkRatio: avgDarkRatio,
    bestMode,
    activeRatio,
    wcagRating,
    isCompliant,
    scoreLabel,
    recommendation,
  };
}
