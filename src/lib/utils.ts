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

/** Copy text to the clipboard, falling back to a hidden <textarea> when the
    async Clipboard API is unavailable (older browsers / insecure origins). */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

export function textMix(hasActive: boolean) {
  return {
    mixBlendMode: hasActive ? ("difference" as const) : ("normal" as const),
    filter: hasActive ? "brightness(2)" : "none",
  };
}
