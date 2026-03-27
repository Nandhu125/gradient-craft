"use client";

import type { AnimationLayer } from "@/types/studio";
import { GRADIENTS } from "@/data/gradients";
import { SliderRow, PillGroup } from "./shared";

interface Props {
  layer: AnimationLayer;
  onChange: (patch: Partial<AnimationLayer>) => void;
  gradientEnabled: boolean;
}

export function AnimationLayerControls({
  layer,
  onChange,
  gradientEnabled,
}: Props) {
  return (
    <div className="space-y-5">
      {!gradientEnabled && layer.enabled && (
        <div
          className="px-3 py-2 rounded-lg text-[11px]"
          style={{
            background: "rgba(204, 151, 255, 0.08)",
            border: "1px solid rgba(204, 151, 255, 0.15)",
            color: "rgba(204, 151, 255, 0.7)",
          }}
        >
          Enable the Gradient layer to see animations
        </div>
      )}

      {/* Preset selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#767576" }}>
          Animation Preset
        </label>
        <div className="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto scrollbar-hide">
          {GRADIENTS.map((g) => {
            const anim = g.style.animation.split(" ");
            const name = anim[0];
            const dur = anim[1] || "8s";
            return (
              <button
                key={g.id}
                onClick={() => onChange({ presetId: g.id })}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 text-left"
                style={{
                  border: layer.presetId === g.id
                    ? "1px solid rgba(204, 151, 255, 0.25)"
                    : "1px solid rgba(72, 72, 73, 0.3)",
                  background: layer.presetId === g.id
                    ? "rgba(204, 151, 255, 0.08)"
                    : "transparent",
                }}
              >
                <div
                  className="w-6 h-6 rounded-md shrink-0"
                  style={{ background: g.style.background }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[11.5px] truncate" style={{ color: "#adaaab" }}>
                    {g.name}
                  </div>
                  <div className="text-[9.5px] font-mono" style={{ color: "#767576" }}>
                    {name} · {dur}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <SliderRow
        label="Speed"
        value={layer.speed}
        min={0.25}
        max={3}
        step={0.25}
        displayValue={`${layer.speed}x`}
        onChange={(v) => onChange({ speed: v })}
      />

      <PillGroup
        label="Direction"
        options={[
          { value: "normal" as const, label: "Normal" },
          { value: "reverse" as const, label: "Reverse" },
          { value: "alternate" as const, label: "Alternate" },
        ]}
        selected={layer.direction}
        onChange={(v) => onChange({ direction: v })}
      />
    </div>
  );
}
