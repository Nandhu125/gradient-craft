"use client";

import type { GradientLayer, GradientStop, MeshPoint } from "@/types/studio";
import { DEFAULT_MESH_POINTS } from "@/types/studio";
import { GRADIENTS } from "@/data/gradients";
import { SliderRow, PillGroup, ColorSwatchInput } from "./shared";

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

  const meshPoints = layer.meshPoints ?? DEFAULT_MESH_POINTS;

  const changeType = (v: GradientLayer["type"]) => {
    // Seed points the first time mesh is selected so the editor has content.
    if (v === "mesh" && !layer.meshPoints) {
      onChange({ type: v, meshPoints: DEFAULT_MESH_POINTS });
    } else {
      onChange({ type: v });
    }
  };

  const updatePoint = (idx: number, patch: Partial<MeshPoint>) => {
    onChange({
      meshPoints: meshPoints.map((p, i) => (i === idx ? { ...p, ...patch } : p)),
    });
  };

  const addPoint = () => {
    if (meshPoints.length >= 6) return;
    onChange({ meshPoints: [...meshPoints, { color: "#ffffff", x: 50, y: 50 }] });
  };

  const removePoint = (idx: number) => {
    if (meshPoints.length <= 2) return;
    onChange({ meshPoints: meshPoints.filter((_, i) => i !== idx) });
  };

  const meshCss = meshPoints
    .map((p) => `radial-gradient(at ${p.x}% ${p.y}%, ${p.color} 0px, transparent 55%)`)
    .join(", ");

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
      <PillGroup
        label="Type"
        options={[
          { value: "linear" as const, label: "Linear" },
          { value: "radial" as const, label: "Radial" },
          { value: "conic" as const, label: "Conic" },
          { value: "mesh" as const, label: "Mesh" },
        ]}
        selected={layer.type}
        onChange={changeType}
      />

      {layer.type === "mesh" && (
        <>
          {/* Mesh live preview */}
          <div
            className="h-24 rounded-lg"
            style={{
              backgroundImage: meshCss,
              border: "1px solid rgba(72, 72, 73, 0.4)",
            }}
          />

          {/* Mesh Points */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#999" }}>
                Mesh Points
              </label>
              {meshPoints.length < 6 && (
                <button
                  onClick={addPoint}
                  className="text-[10.5px] font-medium border-none bg-transparent cursor-pointer transition-colors"
                  style={{ color: "rgba(204, 151, 255, 0.7)" }}
                >
                  + Add
                </button>
              )}
            </div>

            <div className="space-y-3">
              {meshPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="space-y-2 rounded-md p-2"
                  style={{ background: "#201f21", border: "1px solid rgba(72, 72, 73, 0.4)" }}
                >
                  <div className="flex items-center gap-2">
                    <ColorSwatchInput
                      color={point.color}
                      onChange={(color) => updatePoint(idx, { color })}
                      hexBg="#18171a"
                    />
                    <span className="flex-1" />
                    {meshPoints.length > 2 && (
                      <button
                        onClick={() => removePoint(idx)}
                        className="w-6 h-6 flex items-center justify-center rounded border-none cursor-pointer transition-all text-[14px] bg-transparent"
                        style={{ color: "#999" }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <SliderRow
                    label="X"
                    value={point.x}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    onChange={(v) => updatePoint(idx, { x: v })}
                  />
                  <SliderRow
                    label="Y"
                    value={point.y}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    onChange={(v) => updatePoint(idx, { y: v })}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

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
      {layer.type !== "mesh" && (
      <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#999" }}>
            Color Stops
          </label>
          {layer.stops.length < 6 && (
            <button
              onClick={addStop}
              className="text-[10.5px] font-medium border-none bg-transparent cursor-pointer transition-colors"
              style={{ color: "rgba(204, 151, 255, 0.7)" }}
            >
              + Add
            </button>
          )}
        </div>

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
                <button
                  onClick={() => removeStop(idx)}
                  className="w-6 h-6 flex items-center justify-center rounded border-none cursor-pointer transition-all text-[14px] bg-transparent"
                  style={{ color: "#999" }}
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
        className="h-3 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${layer.stops
            .map((s) => `${s.color} ${s.position}%`)
            .join(", ")})`,
          border: "1px solid rgba(72, 72, 73, 0.4)",
        }}
      />
      </>
      )}

      {/* Presets */}
      <div className="space-y-3">
        <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#999" }}>
          Presets
        </label>
        <div className="flex flex-wrap gap-2">
          {GRADIENTS.slice(0, 12).map((g) => (
            <button
              key={g.id}
              onClick={() => loadPreset(g.id)}
              title={g.name}
              className="w-8 h-8 rounded-lg cursor-pointer transition-all duration-200 hover:scale-110 shrink-0"
              style={{
                background: g.style.background,
                border: layer.presetId === g.id
                  ? "2px solid #cc97ff"
                  : "2px solid rgba(72, 72, 73, 0.4)",
                boxShadow: layer.presetId === g.id ? "0 0 10px rgba(204, 151, 255, 0.3)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
