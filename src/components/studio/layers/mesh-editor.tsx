"use client";

import type { GradientLayer, MeshPoint } from "@/types/studio";
import { DEFAULT_MESH_POINTS } from "@/types/studio";
import { SliderRow, ColorSwatchInput, SectionHeader, RemoveButton } from "./shared";

interface Props {
  layer: GradientLayer;
  onChange: (patch: Partial<GradientLayer>) => void;
}

export function MeshEditor({ layer, onChange }: Props) {
  const meshPoints = layer.meshPoints ?? DEFAULT_MESH_POINTS;

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

  return (
    <>
      <div
        className="h-24 rounded-lg"
        style={{
          backgroundImage: meshCss,
          border: "1px solid rgba(72, 72, 73, 0.4)",
        }}
      />

      <div className="space-y-3">
        <SectionHeader
          label="Mesh Points"
          onAdd={meshPoints.length < 6 ? addPoint : undefined}
        />

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
                  <RemoveButton onClick={() => removePoint(idx)} />
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
  );
}
