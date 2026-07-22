"use client";

import type { StudioState } from "@/types/studio";

export function StudioStatusBar({
  state,
  onReset,
}: {
  state: StudioState;
  onReset: () => void;
}) {
  const activeLayers = [
    state.baseColor.enabled && "Base",
    state.gradient.enabled && "Gradient",
    state.pattern.enabled && "Pattern",
    state.noise.enabled && "Noise",
    state.animation.enabled && "Anim",
  ].filter(Boolean);

  return (
    <div className="flex items-center justify-between px-5 py-2.5 border-t border-[#484849]/40 bg-[#131314]/90 backdrop-blur-xl shrink-0">
      <span className="text-[11px] text-[#999] font-mono">
        {activeLayers.length > 0 ? activeLayers.join(" + ") : "No layers active"}
      </span>
      <div className="flex items-center gap-3">
        {state.gradient.enabled && (
          <div className="flex items-center gap-1">
            {state.gradient.stops.slice(0, 4).map((stop, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border border-[#484849]"
                style={{ background: stop.color }}
              />
            ))}
          </div>
        )}
        <button
          onClick={onReset}
          className="sm:hidden px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#999] hover:text-[#ccc] hover:bg-[#201f21] border border-[#484849]/30 transition-all duration-200 cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
