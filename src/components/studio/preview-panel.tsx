"use client";

import type { StudioState } from "@/types/studio";
import { computePreviewStyle, computeNoiseStyle } from "@/lib/studio-css";

interface Props {
  state: StudioState;
}

export function PreviewPanel({ state }: Props) {
  const style = computePreviewStyle(state);
  const noiseStyle = computeNoiseStyle(
    state.noise.enabled,
    state.noise.intensity,
    state.noise.opacity
  );

  const hasAnyLayer =
    state.baseColor.enabled ||
    state.gradient.enabled ||
    state.pattern.enabled ||
    state.noise.enabled;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ambient orbs — always visible behind everything */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "#cc97ff",
          top: "15%",
          left: "20%",
          animation: "orbFloat1 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[250px] h-[250px] rounded-full opacity-15 blur-[80px]"
        style={{
          background: "#699cff",
          bottom: "20%",
          right: "25%",
          animation: "orbFloat2 15s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[200px] h-[200px] rounded-full opacity-10 blur-[60px]"
        style={{
          background: "#8ce7ff",
          top: "50%",
          left: "50%",
          animation: "orbFloat3 10s ease-in-out infinite",
        }}
      />

      {/* Composed background layers */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={style}
      />

      {/* Noise overlay */}
      {state.noise.enabled && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={noiseStyle}
        />
      )}

      {/* Label */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span
          className="text-[10px] font-mono uppercase tracking-[0.15em]"
          style={{ color: "rgba(204, 151, 255, 0.3)" }}
        >
          Live Preview
        </span>
      </div>

      {/* Center indicator when nothing enabled */}
      {!hasAnyLayer && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span
              className="material-symbols-rounded text-[40px]"
              style={{ color: "rgba(204, 151, 255, 0.15)" }}
            >
              layers
            </span>
            <p
              className="text-sm font-medium"
              style={{ color: "rgba(204, 151, 255, 0.2)" }}
            >
              Enable a layer to start
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
