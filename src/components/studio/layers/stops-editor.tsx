"use client";

import type { GradientLayer, GradientStop } from "@/types/studio";
import { ColorSwatchInput, SectionHeader, RemoveButton } from "./shared";

interface Props {
  layer: GradientLayer;
  onChange: (patch: Partial<GradientLayer>) => void;
}

// Editor for the linear/radial/conic types: an editable list of color stops
// (colour + position) capped at 2–6, plus a live gradient preview bar.
export function StopsEditor({ layer, onChange }: Props) {
  const updateStop = (idx: number, patch: Partial<GradientStop>) => {
    const stops = layer.stops.map((s, i) =>
      i === idx ? { ...s, ...patch } : s
    );
    onChange({ stops });
  };

  const addStop = () => {
    if (layer.stops.length >= 6) return;
    const last = layer.stops[layer.stops.length - 1];
    const prev = layer.stops[layer.stops.length - 2];
    const pos = Math.min(100, Math.round((last.position + (prev?.position ?? 0)) / 2 + 25));
    onChange({
      stops: [...layer.stops, { color: "#ffffff", position: Math.min(pos, 100) }],
    });
  };

  const removeStop = (idx: number) => {
    if (layer.stops.length <= 2) return;
    onChange({ stops: layer.stops.filter((_, i) => i !== idx) });
  };

  return (
    <>
      <div className="space-y-3">
        <SectionHeader
          label="Color Stops"
          onAdd={layer.stops.length < 6 ? addStop : undefined}
        />

        <div className="space-y-2">
          {layer.stops.map((stop, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <ColorSwatchInput
                color={stop.color}
                onChange={(color) => updateStop(idx, { color })}
              />
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={stop.position}
                onChange={(e) =>
                  updateStop(idx, { position: parseInt(e.target.value) })
                }
                className="studio-slider flex-1"
              />
              <span className="text-[10px] font-mono w-7 text-right" style={{ color: "#999" }}>
                {stop.position}%
              </span>
              {layer.stops.length > 2 && (
                <RemoveButton onClick={() => removeStop(idx)} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Preview Bar */}
      <div
        className="h-3 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${layer.stops
            .map((s) => `${s.color} ${s.position}%`)
            .join(", ")})`,
          border: "1px solid rgba(72, 72, 73, 0.4)",
        }}
      />
    </>
  );
}
