import { test, expect, describe } from "bun:test";
import {
  buildPatternValue,
  buildPatternSize,
  buildNoiseValue,
  generateCSS,
  generateTailwind,
  computePreviewStyle,
} from "./studio-css";
import { DEFAULT_STUDIO_STATE, DEFAULT_MESH_POINTS } from "@/types/studio";
import type { StudioState, PatternType } from "@/types/studio";

function state(patch: Partial<StudioState> = {}): StudioState {
  return structuredClone({ ...DEFAULT_STUDIO_STATE, ...patch });
}

// Split a CSS list on top-level commas only (ignoring commas inside parens).
function topLevelCommas(value: string): number {
  let depth = 0;
  let count = 1;
  for (const ch of value) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if (ch === "," && depth === 0) count++;
  }
  return count;
}

const ALL_PATTERNS: PatternType[] = [
  "dots",
  "grid",
  "lines",
  "diagonal",
  "checkerboard",
  "crosses",
];

describe("buildPatternValue", () => {
  test("every pattern type produces a non-empty value", () => {
    for (const type of ALL_PATTERNS) {
      expect(buildPatternValue(type, "#ffffff", 0.4)).not.toBe("");
    }
  });

  test("crosses is a distinct SVG tile, not a grid duplicate (regression)", () => {
    const grid = buildPatternValue("grid", "#ffffff", 0.4);
    const crosses = buildPatternValue("crosses", "#ffffff", 0.4);
    expect(crosses).not.toBe(grid);
    expect(crosses).toContain("data:image/svg+xml,");
    expect(crosses).not.toContain("linear-gradient");
  });

  test("hex + opacity fold into an rgba() stop color", () => {
    expect(buildPatternValue("dots", "#ff8800", 0.5)).toContain(
      "rgba(255,136,0,0.5)"
    );
  });
});

describe("buildPatternSize", () => {
  test("image/size comma-count stays aligned for multi-part patterns", () => {
    for (const type of ALL_PATTERNS) {
      if (type === "diagonal") continue; // size is keyword "auto", not a list
      const imageParts = topLevelCommas(buildPatternValue(type, "#fff", 0.4));
      const sizeParts = buildPatternSize(type, 20).split(",").length;
      expect(sizeParts).toBe(imageParts);
    }
  });
});

describe("buildNoiseValue", () => {
  test("emits an encoded feTurbulence data URI", () => {
    const v = buildNoiseValue(0.65, 0.15);
    expect(v).toContain("data:image/svg+xml,");
    expect(v).toContain("feTurbulence");
  });

  test("intensity scales baseFrequency", () => {
    expect(buildNoiseValue(1, 0.15)).toContain("baseFrequency%3D'0.80'");
  });
});

describe("generateCSS", () => {
  test("base color only", () => {
    const css = generateCSS(
      state({ gradient: { ...DEFAULT_STUDIO_STATE.gradient, enabled: false } })
    );
    expect(css).toContain("background-color: #0a0a0a;");
    expect(css).not.toContain("background-image");
  });

  test("stacks pattern above gradient in the image list", () => {
    const css = generateCSS(
      state({
        pattern: { ...DEFAULT_STUDIO_STATE.pattern, enabled: true },
      })
    );
    const patternIdx = css.indexOf("radial-gradient(circle,");
    const gradientIdx = css.indexOf("linear-gradient(135deg");
    expect(patternIdx).toBeGreaterThan(-1);
    expect(gradientIdx).toBeGreaterThan(-1);
    expect(patternIdx).toBeLessThan(gradientIdx);
  });

  test("noise emits an ::after overlay and a positioning context", () => {
    const css = generateCSS(
      state({ noise: { ...DEFAULT_STUDIO_STATE.noise, enabled: true } })
    );
    expect(css).toContain("position: relative;");
    expect(css).toContain(".background::after {");
    expect(css).toContain("feTurbulence");
  });

  test("animation appends its keyframes block", () => {
    const css = generateCSS(
      state({
        animation: {
          ...DEFAULT_STUDIO_STATE.animation,
          enabled: true,
          presetId: "aurora-borealis",
        },
      })
    );
    expect(css).toContain("animation: auroraShift 12.0s ease infinite normal;");
    expect(css).toContain("@keyframes auroraShift");
  });

  test("animation speed divides the preset duration", () => {
    const css = generateCSS(
      state({
        animation: {
          ...DEFAULT_STUDIO_STATE.animation,
          enabled: true,
          presetId: "aurora-borealis",
          speed: 2,
        },
      })
    );
    expect(css).toContain("auroraShift 6.0s");
  });

  test("mesh size list length matches mesh point count", () => {
    const css = generateCSS(
      state({
        gradient: {
          ...DEFAULT_STUDIO_STATE.gradient,
          type: "mesh",
          meshPoints: DEFAULT_MESH_POINTS,
        },
      })
    );
    const sizeLine = css
      .split("\n")
      .find((l) => l.trim().startsWith("background-size"))!;
    const entries = sizeLine.split(",").length;
    expect(entries).toBe(DEFAULT_MESH_POINTS.length);
  });
});

describe("generateTailwind", () => {
  test("emits arbitrary bg image/length utilities with escaped spaces", () => {
    const tw = generateTailwind(state());
    expect(tw).toContain("bg-[image:");
    expect(tw).toContain("bg-[length:");
    expect(tw).not.toMatch(/bg-\[image:[^\]]* [^\]]*\]/); // no raw spaces inside
  });

  test("notes keyframes + noise that can't be utilities", () => {
    const tw = generateTailwind(
      state({
        noise: { ...DEFAULT_STUDIO_STATE.noise, enabled: true },
        animation: {
          ...DEFAULT_STUDIO_STATE.animation,
          enabled: true,
          presetId: "aurora-borealis",
        },
      })
    );
    expect(tw).toContain("keyframes under theme.extend.keyframes");
    expect(tw).toContain("::after grain overlay");
  });
});

describe("computePreviewStyle", () => {
  test("stacks pattern + gradient with an aligned size list", () => {
    const style = computePreviewStyle(
      state({ pattern: { ...DEFAULT_STUDIO_STATE.pattern, enabled: true } })
    );
    // background-size is paren-free, so its comma-count is the layer count.
    expect(String(style.backgroundSize).split(",").length).toBe(2);
    expect(style.backgroundImage).toContain("radial-gradient"); // pattern
    expect(style.backgroundImage).toContain("linear-gradient"); // gradient
  });
});
