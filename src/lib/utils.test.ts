import { test, expect, describe } from "bun:test";
import { safeStyle } from "./utils";
import type { GradientStyle } from "@/types";

const base: GradientStyle = {
  background: "linear-gradient(90deg, #000, #fff)",
  backgroundSize: "400% 400%",
  animation: "shift 8s ease infinite alternate",
};

describe("safeStyle", () => {
  test("remaps background shorthand to backgroundImage", () => {
    const s = safeStyle(base);
    expect(s.backgroundImage).toBe(base.background);
    expect("background" in s).toBe(false);
  });

  test("preserves other longhand props (backgroundSize)", () => {
    expect(safeStyle(base).backgroundSize).toBe("400% 400%");
  });

  test("explodes the animation shorthand into longhand props", () => {
    const s = safeStyle(base);
    expect(s.animationName).toBe("shift");
    expect(s.animationDuration).toBe("8s");
    expect(s.animationTimingFunction).toBe("ease");
    expect(s.animationIterationCount).toBe("infinite");
    expect(s.animationDirection).toBe("alternate");
    expect("animation" in s).toBe(false);
  });

  test("omits animationDirection when the shorthand has no 5th token", () => {
    const s = safeStyle({ ...base, animation: "shift 8s ease infinite" });
    expect(s.animationIterationCount).toBe("infinite");
    expect(s.animationDirection).toBeUndefined();
  });

  test("emits no animation longhands for an empty shorthand", () => {
    const s = safeStyle({ ...base, animation: "" });
    expect(s.animationName).toBeUndefined();
    expect(s.animationDuration).toBeUndefined();
  });
});
