"use client";

import type { BaseColorLayer } from "@/types/studio";
interface Props {
  layer: BaseColorLayer;
  onChange: (patch: Partial<BaseColorLayer>) => void;
}

const PRESETS = [
  "#000000",
  "#0a0a0a",
  "#0e0e0f",
  "#111111",
  "#1a1a2e",
  "#0f0f23",
  "#0c1222",
  "#1e1b4b",
  "#fafafa",
  "#ffffff",
];

export function BaseColorControls({ layer, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#999" }}>
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
            className="flex-1 rounded-lg px-3 py-2 text-[12.5px] font-mono outline-none transition-colors"
            style={{
              background: "#201f21",
              border: "1px solid rgba(72, 72, 73, 0.4)",
              color: "#ccc",
            }}
            maxLength={7}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#999" }}>
          Presets
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ color: c })}
              className="w-8 h-8 rounded-lg cursor-pointer transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: c,
                border: layer.color === c
                  ? "2px solid #cc97ff"
                  : "2px solid rgba(72, 72, 73, 0.4)",
                boxShadow: layer.color === c ? "0 0 10px rgba(204, 151, 255, 0.3)" : "none",
              }}
              title={c}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
