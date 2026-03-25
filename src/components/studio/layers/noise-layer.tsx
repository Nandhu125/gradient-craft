"use client";

import type { NoiseLayer } from "@/types/studio";
import { LayerToggle, SliderRow } from "./shared";

interface Props {
  layer: NoiseLayer;
  onChange: (patch: Partial<NoiseLayer>) => void;
}

export function NoiseLayerControls({ layer, onChange }: Props) {
  return (
    <div className="space-y-5">
      <LayerToggle
        label="Noise / Grain"
        enabled={layer.enabled}
        onToggle={() => onChange({ enabled: !layer.enabled })}
      />

      <SliderRow
        label="Intensity"
        value={layer.intensity}
        min={0.1}
        max={1}
        step={0.05}
        displayValue={`${Math.round(layer.intensity * 100)}%`}
        onChange={(v) => onChange({ intensity: v })}
      />

      <SliderRow
        label="Opacity"
        value={layer.opacity}
        min={0.02}
        max={0.5}
        step={0.02}
        displayValue={`${Math.round(layer.opacity * 100)}%`}
        onChange={(v) => onChange({ opacity: v })}
      />

      {/* Preview swatch */}
      <div className="space-y-2">
        <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
          Preview
        </label>
        <div className="relative h-16 rounded-lg overflow-hidden border border-white/8">
          <div className="absolute inset-0 bg-[#1a1a1a]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${(layer.intensity * 0.8).toFixed(2)}' numOctaves='4' stitchTiles='stitch'/></filter><rect width='300' height='300' filter='url(%23n)' opacity='1'/></svg>`
              )}")`,
              backgroundSize: "300px 300px",
              opacity: layer.opacity,
            }}
          />
        </div>
      </div>
    </div>
  );
}
