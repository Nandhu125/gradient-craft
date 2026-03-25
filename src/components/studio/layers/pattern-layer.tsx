"use client";

import type { PatternLayer, PatternType } from "@/types/studio";
import { buildPatternValue, buildPatternSize } from "@/lib/studio-css";
import { LayerToggle, SliderRow } from "./shared";

interface Props {
  layer: PatternLayer;
  onChange: (patch: Partial<PatternLayer>) => void;
}

const PATTERNS: { type: PatternType; label: string }[] = [
  { type: "dots", label: "Dots" },
  { type: "grid", label: "Grid" },
  { type: "lines", label: "Lines" },
  { type: "diagonal", label: "Diagonal" },
  { type: "checkerboard", label: "Checker" },
  { type: "crosses", label: "Crosses" },
];

const COLOR_PRESETS = ["#ffffff", "#000000", "#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

function patternPreviewStyle(type: PatternType) {
  const bgImage = buildPatternValue(type, "#ffffff", 0.4);
  const bgSize = buildPatternSize(type, 12);
  return {
    backgroundImage: bgImage,
    backgroundSize: bgSize === "auto" ? undefined : bgSize,
    backgroundColor: "#1a1a1a",
  };
}

export function PatternLayerControls({ layer, onChange }: Props) {
  return (
    <div className="space-y-5">
      <LayerToggle
        label="Pattern"
        enabled={layer.enabled}
        onToggle={() => onChange({ enabled: !layer.enabled })}
      />

      {/* Pattern selector */}
      <div className="space-y-2">
        <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
          Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PATTERNS.map((p) => (
            <button
              key={p.type}
              onClick={() => onChange({ type: p.type })}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                layer.type === p.type
                  ? "border-white/30 bg-white/8"
                  : "border-white/8 bg-transparent hover:border-white/15 hover:bg-white/3"
              }`}
            >
              <div
                className="w-full h-10 rounded-md"
                style={patternPreviewStyle(p.type)}
              />
              <span className="text-[10px] text-white/50">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <SliderRow
        label="Size"
        value={layer.size}
        min={8}
        max={80}
        step={1}
        unit="px"
        onChange={(v) => onChange({ size: v })}
      />

      {/* Color */}
      <div className="space-y-2">
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
          <div className="flex gap-1.5">
            {COLOR_PRESETS.map((c) => (
              <button
                key={c}
                onClick={() => onChange({ color: c })}
                className={`w-6 h-6 rounded-md border cursor-pointer transition-all duration-200 hover:scale-110 ${
                  layer.color === c
                    ? "border-white/50"
                    : "border-white/10"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <SliderRow
        label="Opacity"
        value={layer.opacity}
        min={0.02}
        max={0.5}
        step={0.02}
        displayValue={`${Math.round(layer.opacity * 100)}%`}
        onChange={(v) => onChange({ opacity: v })}
      />
    </div>
  );
}
