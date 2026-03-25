"use client";

import type { GradientLayer, GradientStop } from "@/types/studio";
import { GRADIENTS } from "@/data/gradients";
import { LayerToggle, SliderRow, PillGroup } from "./shared";

interface Props {
  layer: GradientLayer;
  onChange: (patch: Partial<GradientLayer>) => void;
}

function parseSimpleGradient(
  bg: string
): { angle: number; stops: GradientStop[] } | null {
  const m = bg.match(/linear-gradient\((-?\d+)deg,\s*(.+)\)/);
  if (!m) return null;
  const angle = parseInt(m[1], 10);
  const parts = m[2].split(",").map((s) => s.trim());
  const stops: GradientStop[] = parts.map((p, i) => {
    const tokens = p.trim().split(/\s+/);
    const color = tokens[0];
    const pos = tokens[1]
      ? parseFloat(tokens[1])
      : Math.round((i / (parts.length - 1)) * 100);
    return { color, position: pos };
  });
  return { angle: ((angle % 360) + 360) % 360, stops };
}

export function GradientLayerControls({ layer, onChange }: Props) {
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

  const loadPreset = (id: string) => {
    const preset = GRADIENTS.find((g) => g.id === id);
    if (!preset) return;
    const parsed = parseSimpleGradient(preset.style.background);
    if (parsed) {
      onChange({
        type: "linear",
        angle: parsed.angle,
        stops: parsed.stops,
        presetId: id,
      });
    } else {
      onChange({
        type: "linear",
        angle: 135,
        stops: [
          { color: "#667eea", position: 0 },
          { color: "#764ba2", position: 100 },
        ],
        presetId: id,
      });
    }
  };

  return (
    <div className="space-y-5">
      <LayerToggle
        label="Gradient"
        enabled={layer.enabled}
        onToggle={() => onChange({ enabled: !layer.enabled })}
      />

      <PillGroup
        label="Type"
        options={[
          { value: "linear" as const, label: "Linear" },
          { value: "radial" as const, label: "Radial" },
          { value: "conic" as const, label: "Conic" },
        ]}
        selected={layer.type}
        onChange={(v) => onChange({ type: v })}
      />

      {(layer.type === "linear" || layer.type === "conic") && (
        <SliderRow
          label="Angle"
          value={layer.angle}
          min={0}
          max={360}
          step={1}
          unit="°"
          onChange={(v) => onChange({ angle: v })}
        />
      )}

      {/* Color Stops */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
            Color Stops
          </label>
          {layer.stops.length < 6 && (
            <button
              onClick={addStop}
              className="text-[10.5px] font-medium text-emerald-400/70 hover:text-emerald-400 border-none bg-transparent cursor-pointer transition-colors"
            >
              + Add
            </button>
          )}
        </div>

        <div className="space-y-2">
          {layer.stops.map((stop, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(idx, { color: e.target.value })}
                className="studio-color-input !w-8 !h-8 !rounded-md"
              />
              <input
                type="text"
                value={stop.color}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^#[0-9a-fA-F]{0,6}$/.test(v))
                    updateStop(idx, { color: v });
                }}
                className="w-[80px] bg-white/5 border border-white/10 rounded-md px-2 py-1.5 text-[11px] font-mono text-white/60 outline-none focus:border-white/20 transition-colors"
                maxLength={7}
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
                className="ctrl-slider flex-1"
              />
              <span className="text-[10px] text-white/30 font-mono w-7 text-right">
                {stop.position}%
              </span>
              {layer.stops.length > 2 && (
                <button
                  onClick={() => removeStop(idx)}
                  className="w-6 h-6 flex items-center justify-center rounded text-white/20 hover:text-red-400 hover:bg-white/5 border-none cursor-pointer transition-all text-[14px] bg-transparent"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Preview Bar */}
      <div
        className="h-3 rounded-full border border-white/10"
        style={{
          background: `linear-gradient(90deg, ${layer.stops
            .map((s) => `${s.color} ${s.position}%`)
            .join(", ")})`,
        }}
      />

      {/* Presets */}
      <div className="space-y-3">
        <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
          Presets
        </label>
        <div className="flex flex-wrap gap-2">
          {GRADIENTS.slice(0, 12).map((g) => (
            <button
              key={g.id}
              onClick={() => loadPreset(g.id)}
              title={g.name}
              className={`w-8 h-8 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-110 shrink-0 ${
                layer.presetId === g.id
                  ? "border-white/60 scale-105"
                  : "border-white/10 hover:border-white/25"
              }`}
              style={{ background: g.style.background }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
