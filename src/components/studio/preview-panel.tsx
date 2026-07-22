"use client";

import type { StudioState } from "@/types/studio";
import { computePreviewStyle, computeNoiseStyle } from "@/lib/studio-css";
import { LayersIcon } from "@/components/ui/icons";

interface Props {
  state: StudioState;
}

export function PreviewPanel({ state }: Props) {
  const style = computePreviewStyle(state);
  const noiseStyle = computeNoiseStyle(
    state.noise.enabled,
    state.noise.intensity,
    state.noise.opacity,
  );

  const hasAnyLayer =
    state.baseColor.enabled ||
    state.gradient.enabled ||
    state.pattern.enabled ||
    state.noise.enabled;

  return (
    <div className="absolute inset-0 overflow-hidden">
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

      <div
        className="absolute inset-0 transition-all duration-300"
        style={style}
      />

      {state.noise.enabled && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={noiseStyle}
        />
      )}

      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div
          className="flex items-center gap-2 rounded-full pl-2.5 pr-3 py-1.5 border border-white/15 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
          style={{ background: "rgba(14, 14, 15, 0.55)" }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ background: "#cc97ff" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#cc97ff" }} />
          </span>
          <span
            className="text-[10px] font-mono uppercase tracking-[0.15em] font-semibold"
            style={{ color: "rgba(255, 255, 255, 0.85)" }}
          >
            Live Preview
          </span>
        </div>
      </div>

      {!hasAnyLayer && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span
              style={{ color: "rgba(204, 151, 255, 0.4)" }}
              className="flex"
            >
              <LayersIcon size={40} />
            </span>
            <p
              className="text-sm font-medium"
              style={{ color: "rgba(204, 151, 255, 0.55)" }}
            >
              Enable a layer to start
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
