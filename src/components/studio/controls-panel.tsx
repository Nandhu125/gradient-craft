"use client";

import type { StudioState, StudioTab } from "@/types/studio";
import { BaseColorControls } from "./layers/base-color";
import { GradientLayerControls } from "./layers/gradient-layer";
import { PatternLayerControls } from "./layers/pattern-layer";
import { NoiseLayerControls } from "./layers/noise-layer";
import { AnimationLayerControls } from "./layers/animation-layer";

interface Props {
  state: StudioState;
  expandedSections: StudioTab[];
  toggleSection: (tab: StudioTab) => void;
  updateLayer: <K extends keyof StudioState>(
    layer: K,
    patch: Partial<StudioState[K]>
  ) => void;
}

const SECTIONS: {
  id: StudioTab;
  label: string;
  icon: string;
  layerKey: keyof StudioState;
}[] = [
  { id: "base", label: "Base Color", icon: "palette", layerKey: "baseColor" },
  { id: "gradient", label: "Gradient", icon: "gradient", layerKey: "gradient" },
  { id: "pattern", label: "Pattern", icon: "grid_view", layerKey: "pattern" },
  { id: "noise", label: "Noise / Grain", icon: "grain", layerKey: "noise" },
  { id: "animation", label: "Animation", icon: "animation", layerKey: "animation" },
];

export function ControlsPanel({
  state,
  expandedSections,
  toggleSection,
  updateLayer,
}: Props) {
  const toggleLayerEnabled = (layerKey: keyof StudioState) => {
    const current = state[layerKey].enabled;
    updateLayer(layerKey, { enabled: !current } as Partial<StudioState[typeof layerKey]>);
  };

  return (
    <div
      className="w-full lg:w-[340px] flex flex-col overflow-hidden shrink-0 border-l"
      style={{
        background: "rgba(14, 14, 15, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(72, 72, 73, 0.4)",
      }}
    >
      {/* Panel Title */}
      <div
        className="flex items-center justify-between px-5 py-3 shrink-0 border-b"
        style={{ borderColor: "rgba(72, 72, 73, 0.3)" }}
      >
        <span
          className="text-[13px] font-semibold"
          style={{ color: "#cc97ff", fontFamily: "'Manrope', sans-serif" }}
        >
          Layers
        </span>
        <span className="text-[10px] font-mono" style={{ color: "#767576" }}>
          {SECTIONS.filter((s) => state[s.layerKey].enabled).length}/5 active
        </span>
      </div>

      {/* Accordion Sections */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {SECTIONS.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          const isEnabled = state[section.layerKey].enabled;

          return (
            <div key={section.id}>
              {/* Section Header */}
              <div
                className="flex items-center gap-3 px-5 py-3 cursor-pointer select-none transition-colors duration-150 border-b"
                style={{
                  borderColor: "rgba(72, 72, 73, 0.2)",
                  background: isExpanded ? "rgba(204, 151, 255, 0.04)" : "transparent",
                }}
              >
                {/* Visibility toggle (eye) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLayerEnabled(section.layerKey);
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-md border-none cursor-pointer transition-all duration-200"
                  style={{
                    background: isEnabled ? "rgba(204, 151, 255, 0.12)" : "transparent",
                    color: isEnabled ? "#cc97ff" : "#484849",
                  }}
                  title={isEnabled ? "Hide layer" : "Show layer"}
                >
                  <span className="material-symbols-rounded text-[18px]">
                    {isEnabled ? "visibility" : "visibility_off"}
                  </span>
                </button>

                {/* Label + icon — clickable to expand */}
                <div
                  className="flex-1 flex items-center gap-2"
                  onClick={() => toggleSection(section.id)}
                >
                  <span
                    className="material-symbols-rounded text-[18px]"
                    style={{ color: isExpanded ? "#cc97ff" : "#767576" }}
                  >
                    {section.icon}
                  </span>
                  <span
                    className="text-[12.5px] font-medium"
                    style={{ color: isExpanded ? "#fff" : "#adaaab" }}
                  >
                    {section.label}
                  </span>
                </div>

                {/* Expand chevron */}
                <span
                  className="material-symbols-rounded text-[18px] transition-transform duration-200 cursor-pointer"
                  style={{
                    color: "#767576",
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  onClick={() => toggleSection(section.id)}
                >
                  expand_more
                </span>
              </div>

              {/* Section Content */}
              {isExpanded && (
                <div
                  className="px-5 py-4 border-b"
                  style={{
                    borderColor: "rgba(72, 72, 73, 0.2)",
                    background: "rgba(204, 151, 255, 0.02)",
                  }}
                >
                  {section.id === "base" && (
                    <BaseColorControls
                      layer={state.baseColor}
                      onChange={(patch) => updateLayer("baseColor", patch)}
                    />
                  )}
                  {section.id === "gradient" && (
                    <GradientLayerControls
                      layer={state.gradient}
                      onChange={(patch) => updateLayer("gradient", patch)}
                    />
                  )}
                  {section.id === "pattern" && (
                    <PatternLayerControls
                      layer={state.pattern}
                      onChange={(patch) => updateLayer("pattern", patch)}
                    />
                  )}
                  {section.id === "noise" && (
                    <NoiseLayerControls
                      layer={state.noise}
                      onChange={(patch) => updateLayer("noise", patch)}
                    />
                  )}
                  {section.id === "animation" && (
                    <AnimationLayerControls
                      layer={state.animation}
                      onChange={(patch) => updateLayer("animation", patch)}
                      gradientEnabled={state.gradient.enabled}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
