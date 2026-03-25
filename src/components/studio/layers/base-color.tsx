"use client";

import type { BaseColorLayer } from "@/types/studio";
import { LayerToggle } from "./shared";

interface Props {
  layer: BaseColorLayer;
  onChange: (patch: Partial<BaseColorLayer>) => void;
}

const PRESETS = [
  "#000000",
  "#0a0a0a",
  "#111111",
  "#1a1a2e",
  "#0f0f23",
  "#0c1222",
  "#1e1b4b",
  "#fafafa",
  "#ffffff",
  "#0d1117",
];

export function BaseColorControls({ layer, onChange }: Props) {
  return (
    <div className="space-y-5">
      <LayerToggle
        label="Base Color"
        enabled={layer.enabled}
        onToggle={() => onChange({ enabled: !layer.enabled })}
      />

      <div className="space-y-3">
        <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
          Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={layer.color}
            onChange={(e) => onChange({ color: e.target.value })}
            className="studio-color-input"
          />
          <input
            type="text"
            value={layer.color}
            onChange={(e) => {
              const v = e.target.value;
              if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange({ color: v });
            }}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[12.5px] font-mono text-white/70 outline-none focus:border-white/20 transition-colors"
            maxLength={7}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
          Presets
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ color: c })}
              className={`w-8 h-8 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                layer.color === c
                  ? "border-white/60 scale-105"
                  : "border-white/10 hover:border-white/25"
              }`}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
