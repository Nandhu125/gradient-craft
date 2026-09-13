"use client";

import type { CSSProperties } from "react";

interface MobilePreviewProps {
  textMode: "light" | "dark";
  backgroundStyle: CSSProperties;
  noiseStyle?: CSSProperties;
  hasNoise?: boolean;
}

export function MobilePreview({
  textMode,
  backgroundStyle,
  noiseStyle,
  hasNoise,
}: MobilePreviewProps) {
  const isLight = textMode === "light";

  return (
    <div className="w-full h-full flex items-center justify-center p-4 select-none">
      {/* Phone Mockup Frame */}
      <div className="relative w-[300px] h-[520px] rounded-[44px] p-3 bg-neutral-950 border-[4px] border-neutral-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-black z-30 flex items-center justify-between px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e]" />
          <div className="w-2 h-2 rounded-full bg-indigo-500/40" />
        </div>

        {/* Screen Bezel / Container */}
        <div className="relative flex-1 w-full rounded-[34px] overflow-hidden flex flex-col justify-between">
          {/* Background Layer inside Phone */}
          <div className="absolute inset-0 z-0" style={backgroundStyle} />
          {hasNoise && noiseStyle && (
            <div className="absolute inset-0 z-0 pointer-events-none" style={noiseStyle} />
          )}

          {/* Top Status Bar */}
          <div
            className={`relative z-20 pt-2 px-5 flex items-center justify-between text-[10px] font-semibold transition-colors duration-300 ${
              isLight ? "text-white" : "text-slate-900"
            }`}
          >
            <span>9:41</span>
            <div className="flex items-center gap-1.5 opacity-80">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
                <path d="M0 8h2v2H0zm3-3h2v5H3zm3-3h2v8H6zm3-2h2v10H9z" />
              </svg>
              <span className="text-[9px]">5G</span>
              <div className="w-4 h-2 rounded-sm border border-current p-0.5 flex items-center">
                <div className="w-2.5 h-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>

          {/* App Header */}
          <div
            className={`relative z-20 px-4 pt-6 pb-2 flex items-center justify-between ${
              isLight ? "text-white" : "text-slate-900"
            }`}
          >
            <div>
              <p className="text-[9px] uppercase tracking-wider font-mono opacity-70">
                Good Morning
              </p>
              <h3 className="text-base font-bold">Studio Hub</h3>
            </div>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center border backdrop-blur-md ${
                isLight ? "bg-white/10 border-white/20" : "bg-black/5 border-black/10"
              }`}
            >
              <span className="text-xs">⚡</span>
            </div>
          </div>

          {/* Scrollable Story Pills Mock */}
          <div className="relative z-20 px-4 py-2 flex items-center gap-2 overflow-hidden">
            {["Gradients", "Textures", "CSS Keyframes", "Palettes"].map((tag, i) => (
              <span
                key={tag}
                className={`text-[10px] font-medium px-2.5 py-1 rounded-full border whitespace-nowrap backdrop-blur-md ${
                  i === 0
                    ? isLight
                      ? "bg-white text-black border-white"
                      : "bg-slate-900 text-white border-slate-900"
                    : isLight
                    ? "bg-black/20 text-white/80 border-white/10"
                    : "bg-white/50 text-slate-800 border-black/5"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Featured Content Glass Card */}
          <div className="relative z-20 px-4 my-auto">
            <div
              className={`p-3.5 rounded-2xl border backdrop-blur-xl shadow-lg transition-colors duration-300 ${
                isLight
                  ? "bg-black/35 border-white/20 text-white"
                  : "bg-white/75 border-black/10 text-slate-900 shadow-slate-900/10"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  60 FPS Verified
                </span>
                <span className="text-[10px] opacity-60">Pure CSS</span>
              </div>
              <h4 className="text-xs font-bold mb-1">GPU Composited Layers</h4>
              <p className="text-[10px] opacity-75 leading-relaxed mb-3">
                Zero JavaScript execution on the animation thread.
              </p>
              <div
                className={`py-1.5 rounded-lg text-center text-[10px] font-semibold border ${
                  isLight
                    ? "bg-white text-black border-white"
                    : "bg-slate-900 text-white border-slate-900"
                }`}
              >
                Copy Mobile CSS
              </div>
            </div>
          </div>

          {/* Bottom Navigation Dock */}
          <div
            className={`relative z-20 px-6 py-2.5 m-2 rounded-2xl border backdrop-blur-xl flex items-center justify-between text-xs transition-colors duration-300 ${
              isLight
                ? "bg-black/40 border-white/15 text-white"
                : "bg-white/60 border-black/10 text-slate-900"
            }`}
          >
            <span className="opacity-100 font-bold">●</span>
            <span className="opacity-50">▲</span>
            <span className="opacity-50">■</span>
            <span className="opacity-50">◆</span>
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="relative z-20 pb-1 flex justify-center">
            <div
              className={`w-24 h-1 rounded-full ${
                isLight ? "bg-white/60" : "bg-black/40"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
