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

  return (
    <div className="flex-1 relative overflow-hidden min-h-[40vh] lg:min-h-0">
      {/* Background layers */}
      <div
        className="absolute inset-0 transition-[background-color] duration-300"
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
      <div className="absolute top-4 left-4 text-white/20 text-[10px] font-mono uppercase tracking-[0.15em]">
        Live Preview
      </div>

      {/* Center indicator when nothing enabled */}
      {!state.baseColor.enabled &&
        !state.gradient.enabled &&
        !state.pattern.enabled &&
        !state.noise.enabled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/15 text-sm font-medium">
              Enable a layer to start
            </p>
          </div>
        )}
    </div>
  );
}
