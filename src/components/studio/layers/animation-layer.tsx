"use client";

import type { AnimationLayer } from "@/types/studio";
import { GRADIENTS } from "@/data/gradients";
import { LayerToggle, SliderRow, PillGroup } from "./shared";

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
      <LayerToggle
        label="Animation"
        enabled={layer.enabled}
        onToggle={() => onChange({ enabled: !layer.enabled })}
      />

      {!gradientEnabled && layer.enabled && (
        <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-400/80">
          Enable the Gradient layer to see animations
        </div>
      )}

      {/* Preset selector */}
      <div className="space-y-2">
        <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
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
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 text-left ${
                  layer.presetId === g.id
                    ? "border-white/25 bg-white/8"
                    : "border-white/6 bg-transparent hover:border-white/12 hover:bg-white/3"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-md shrink-0"
                  style={{ background: g.style.background }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[11.5px] text-white/70 truncate">
                    {g.name}
                  </div>
                  <div className="text-[9.5px] text-white/30 font-mono">
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
