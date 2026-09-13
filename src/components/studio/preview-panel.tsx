"use client";

import { useState, useMemo } from "react";
import type { StudioState } from "@/types/studio";
import { computePreviewStyle, computeNoiseStyle } from "@/lib/studio-css";
import { analyzeStudioContrast } from "@/lib/contrast-analyzer";
import { LayersIcon, MonitorIcon, CardIcon, SmartphoneIcon } from "@/components/ui/icons";
import { HeroPreview } from "./preview-contexts/hero-preview";
import { CardPreview } from "./preview-contexts/card-preview";
import { MobilePreview } from "./preview-contexts/mobile-preview";
import { ContrastBadge } from "./contrast-badge";

interface Props {
  state: StudioState;
}

export type PreviewContextMode = "canvas" | "hero" | "card" | "mobile";

export function PreviewPanel({ state }: Props) {
  const [contextMode, setContextMode] = useState<PreviewContextMode>("canvas");
  const [textMode, setTextMode] = useState<"light" | "dark">("light");

  const style = computePreviewStyle(state);
  const noiseStyle = computeNoiseStyle(
    state.noise.enabled,
    state.noise.intensity,
    state.noise.opacity
  );

  const hasAnyLayer =
    state.baseColor.enabled ||
    state.gradient.enabled ||
    state.pattern.enabled ||
    state.noise.enabled;

  const contrast = useMemo(
    () => analyzeStudioContrast(state, textMode),
    [state, textMode]
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0b]">
      {/* Background ambient orbs (visible in canvas mode) */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{
          background: "#cc97ff",
          top: "15%",
          left: "20%",
          animation: "orbFloat1 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[250px] h-[250px] rounded-full opacity-15 blur-[80px] pointer-events-none"
        style={{
          background: "#699cff",
          bottom: "20%",
          right: "25%",
          animation: "orbFloat2 15s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[200px] h-[200px] rounded-full opacity-10 blur-[60px] pointer-events-none"
        style={{
          background: "#8ce7ff",
          top: "50%",
          left: "50%",
          animation: "orbFloat3 10s ease-in-out infinite",
        }}
      />

      {/* Main Canvas Gradient (shown in canvas, hero, and card modes) */}
      {contextMode !== "mobile" && (
        <div
          className="absolute inset-0 transition-all duration-300"
          style={style}
        />
      )}

      {/* Main Canvas Noise Overlay */}
      {contextMode !== "mobile" && state.noise.enabled && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={noiseStyle}
        />
      )}

      {/* Realistic UI Context Overlay */}
      <div className="absolute inset-0 z-10 overflow-y-auto">
        {contextMode === "hero" && <HeroPreview textMode={textMode} />}
        {contextMode === "card" && <CardPreview textMode={textMode} />}
        {contextMode === "mobile" && (
          <MobilePreview
            textMode={textMode}
            backgroundStyle={style}
            noiseStyle={noiseStyle}
            hasNoise={state.noise.enabled}
          />
        )}
      </div>

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left: Live Indicator + Context Segmented Switcher */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div
            className="flex items-center gap-2 rounded-full pl-2.5 pr-3 py-1.5 border border-white/15 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
            style={{ background: "rgba(14, 14, 15, 0.65)" }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                style={{ background: "#cc97ff" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#cc97ff" }} />
            </span>
            <span
              className="text-[10px] font-mono uppercase tracking-[0.15em] font-semibold hidden sm:inline"
              style={{ color: "rgba(255, 255, 255, 0.85)" }}
            >
              Live
            </span>
          </div>

          {/* Context Segment Switcher */}
          <div
            className="flex items-center p-1 rounded-full border border-white/15 backdrop-blur-md shadow-lg"
            style={{ background: "rgba(14, 14, 15, 0.75)" }}
          >
            {[
              { id: "canvas", label: "Canvas", icon: <span className="text-xs">🖼</span> },
              { id: "hero", label: "Hero UI", icon: <MonitorIcon size={13} /> },
              { id: "card", label: "Card UI", icon: <CardIcon size={13} /> },
              { id: "mobile", label: "Mobile", icon: <SmartphoneIcon size={13} /> },
            ].map((tab) => {
              const active = contextMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setContextMode(tab.id as PreviewContextMode)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border-none ${
                    active
                      ? "bg-[#cc97ff] text-[#0e0e0f] font-semibold shadow-[0_0_12px_rgba(204,151,255,0.3)]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: WCAG Contrast Pill & Light/Dark Text Toggle */}
        <div className="pointer-events-auto">
          <ContrastBadge
            contrast={contrast}
            textMode={textMode}
            onToggleTextMode={() =>
              setTextMode((prev) => (prev === "light" ? "dark" : "light"))
            }
          />
        </div>
      </div>

      {/* Empty layer placeholder */}
      {!hasAnyLayer && contextMode === "canvas" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="flex flex-col items-center gap-3">
            <span
              style={{ color: "rgba(204, 151, 255, 0.4)" }}
              className="flex"
            >
              <LayersIcon size={40} />
            </span>
            <p
              className="text-sm font-medium"
              style={{ color: "rgba(204, 151, 255, 0.55)" }}
            >
              Enable a layer to start
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
