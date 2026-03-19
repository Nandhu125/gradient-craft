import type { GradientStyle, SafeStyle } from "@/types";

export function safeStyle(style: GradientStyle): SafeStyle {
  const { background, animation, ...rest } = style;
  const safe: SafeStyle = { backgroundImage: background, ...rest };
  if (animation) {
    const parts = animation.split(" ");
    safe.animationName = parts[0] ?? "";
    safe.animationDuration = parts[1] ?? "";
    safe.animationTimingFunction = parts[2] ?? "";
    safe.animationIterationCount = parts[3] ?? "";
    if (parts[4]) safe.animationDirection = parts[4];
  }
  return safe;
}

export function textMix(hasActive: boolean) {
  return {
    mixBlendMode: hasActive ? ("difference" as const) : ("normal" as const),
    filter: hasActive ? "brightness(2)" : "none",
  };
}
