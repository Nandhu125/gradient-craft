"use client";

import type { StudioState, StudioTab } from "@/types/studio";
import { BaseColorControls } from "./layers/base-color";
import { GradientLayerControls } from "./layers/gradient-layer";
import { PatternLayerControls } from "./layers/pattern-layer";
import { NoiseLayerControls } from "./layers/noise-layer";
import { AnimationLayerControls } from "./layers/animation-layer";

interface Props {
  state: StudioState;
  activeTab: StudioTab;
  setActiveTab: (tab: StudioTab) => void;
  updateLayer: <K extends keyof StudioState>(
    layer: K,
    patch: Partial<StudioState[K]>
  ) => void;
}

const TABS: { id: StudioTab; label: string; layerKey: keyof StudioState }[] = [
  { id: "base", label: "Base", layerKey: "baseColor" },
  { id: "gradient", label: "Gradient", layerKey: "gradient" },
  { id: "pattern", label: "Pattern", layerKey: "pattern" },
  { id: "noise", label: "Noise", layerKey: "noise" },
  { id: "animation", label: "Animate", layerKey: "animation" },
];

export function ControlsPanel({
  state,
  activeTab,
  setActiveTab,
  updateLayer,
}: Props) {
  return (
    <div className="w-full lg:w-[380px] bg-[#111]/95 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-white/8 flex flex-col overflow-hidden shrink-0">
      {/* Tab Bar */}
      <div className="flex gap-1 p-2.5 border-b border-white/8 overflow-x-auto scrollbar-hide shrink-0">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const layerEnabled = state[tab.layerKey].enabled;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium whitespace-nowrap border-none cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-white/12 text-white"
                  : "bg-transparent text-white/40 hover:text-white/60 hover:bg-white/5"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 ${
                  layerEnabled ? "bg-emerald-400" : "bg-white/20"
                }`}
              />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {activeTab === "base" && (
          <BaseColorControls
            layer={state.baseColor}
            onChange={(patch) => updateLayer("baseColor", patch)}
          />
        )}
        {activeTab === "gradient" && (
          <GradientLayerControls
            layer={state.gradient}
            onChange={(patch) => updateLayer("gradient", patch)}
          />
        )}
        {activeTab === "pattern" && (
          <PatternLayerControls
            layer={state.pattern}
            onChange={(patch) => updateLayer("pattern", patch)}
          />
        )}
        {activeTab === "noise" && (
          <NoiseLayerControls
            layer={state.noise}
            onChange={(patch) => updateLayer("noise", patch)}
          />
        )}
        {activeTab === "animation" && (
          <AnimationLayerControls
            layer={state.animation}
            onChange={(patch) => updateLayer("animation", patch)}
            gradientEnabled={state.gradient.enabled}
          />
        )}
      </div>
    </div>
  );
}
