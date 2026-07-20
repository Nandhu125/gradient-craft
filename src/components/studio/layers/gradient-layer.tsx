"use client";

import type { GradientLayer, GradientStop } from "@/types/studio";
import { DEFAULT_MESH_POINTS } from "@/types/studio";
import { GRADIENTS } from "@/data/gradients";
import { SliderRow, PillGroup } from "./shared";
import { MeshEditor } from "./mesh-editor";
import { StopsEditor } from "./stops-editor";

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
  const changeType = (v: GradientLayer["type"]) => {
    // Seed points the first time mesh is selected so the editor has content.
    if (v === "mesh" && !layer.meshPoints) {
      onChange({ type: v, meshPoints: DEFAULT_MESH_POINTS });
    } else {
      onChange({ type: v });
    }
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

      {layer.type === "mesh" && <MeshEditor layer={layer} onChange={onChange} />}

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
      {layer.type !== "mesh" && <StopsEditor layer={layer} onChange={onChange} />}

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
