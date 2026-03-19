import type { Gradient, AnimationState } from "@/types";
import { GRADIENTS } from "@/data/gradients";
import { safeStyle } from "@/lib/utils";
import type { CSSProperties } from "react";

interface Props {
  activeGradient: Gradient | null;
  animState: AnimationState;
}

function getCustomAnimationProps(g: Gradient, activeGradient: Gradient | null, animState: AnimationState): CSSProperties {
  if (!activeGradient || g.id !== activeGradient.id) return {};
  const parts = g.style.animation.split(" ");
  const name = parts[0] ?? "";
  const origDuration = parseFloat(parts[1] ?? "1");
  const dur = (origDuration / animState.speed).toFixed(1);
  return {
    animationName: name,
    animationDuration: `${dur}s`,
    animationTimingFunction: animState.timing,
    animationIterationCount: "infinite",
    animationDirection: animState.direction,
  };
}

export function GradientBackground({ activeGradient, animState }: Props) {
  const hasActive = !!activeGradient;

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        {GRADIENTS.map((g) => {
          const isThis = activeGradient?.id === g.id;
          const customAnimProps = getCustomAnimationProps(g, activeGradient, animState);
          const safe = safeStyle(g.style);
          return (
            <div
              key={g.id}
              className={`absolute inset-0 transition-opacity duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isThis ? "opacity-100" : "opacity-0"
              }`}
              style={{
                ...safe,
                ...(isThis ? customAnimProps : {}),
                animationPlayState: isThis && animState.paused ? "paused" : "running",
              }}
            />
          );
        })}
      </div>

      {/* Ambient blob — only when no active gradient */}
      {!hasActive && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-12%] right-[-8%] w-1/2 h-1/2 bg-[radial-gradient(circle,_rgba(140,120,200,0.04)_0%,_transparent_70%)] rounded-full" />
        </div>
      )}
    </>
  );
}
