"use client";

import type { PatternLayer, PatternType } from "@/types/studio";
import { buildPatternValue, buildPatternSize } from "@/lib/studio-css";
import { SliderRow } from "./shared";

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

const COLOR_PRESETS = ["#ffffff", "#000000", "#cc97ff", "#699cff", "#8ce7ff", "#ef4444"];

function patternPreviewStyle(type: PatternType) {
  const bgImage = buildPatternValue(type, "#ffffff", 0.4);
  const bgSize = buildPatternSize(type, 12);
  return {
    backgroundImage: bgImage,
    backgroundSize: bgSize === "auto" ? undefined : bgSize,
    backgroundColor: "#1a191b",
  };
}

export function PatternLayerControls({ layer, onChange }: Props) {
  return (
    <div className="space-y-5">
      {/* Pattern selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#999" }}>
          Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PATTERNS.map((p) => (
            <button
              key={p.type}
              onClick={() => onChange({ type: p.type })}
              className="flex flex-col items-center gap-1.5 p-2 rounded-lg cursor-pointer transition-all duration-200"
              style={{
                border: layer.type === p.type
                  ? "1px solid rgba(204, 151, 255, 0.3)"
                  : "1px solid rgba(72, 72, 73, 0.4)",
                background: layer.type === p.type
                  ? "rgba(204, 151, 255, 0.08)"
                  : "transparent",
              }}
            >
              <div
                className="w-full h-10 rounded-md"
                style={patternPreviewStyle(p.type)}
              />
              <span className="text-[10px]" style={{ color: layer.type === p.type ? "#cc97ff" : "#767576" }}>
                {p.label}
              </span>
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
          <div className="flex gap-1.5">
            {COLOR_PRESETS.map((c) => (
              <button
                key={c}
                onClick={() => onChange({ color: c })}
                className="w-6 h-6 rounded-md cursor-pointer transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: c,
                  border: layer.color === c
                    ? "2px solid #cc97ff"
                    : "2px solid rgba(72, 72, 73, 0.4)",
                }}
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
