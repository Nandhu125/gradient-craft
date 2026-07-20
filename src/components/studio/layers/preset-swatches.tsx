"use client";

import { GRADIENTS } from "@/data/gradients";

interface Props {
  activeId?: string | null;
  onLoad: (id: string) => void;
}

// The first dozen library gradients as clickable swatches; the active preset
// gets a highlighted ring.
export function PresetSwatches({ activeId, onLoad }: Props) {
  return (
    <div className="space-y-3">
      <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#999" }}>
        Presets
      </label>
      <div className="flex flex-wrap gap-2">
        {GRADIENTS.slice(0, 12).map((g) => (
          <button
            key={g.id}
            onClick={() => onLoad(g.id)}
            title={g.name}
            className="w-8 h-8 rounded-lg cursor-pointer transition-all duration-200 hover:scale-110 shrink-0"
            style={{
              background: g.style.background,
              border: activeId === g.id
                ? "2px solid #cc97ff"
                : "2px solid rgba(72, 72, 73, 0.4)",
              boxShadow: activeId === g.id ? "0 0 10px rgba(204, 151, 255, 0.3)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
