"use client";

import { useState } from "react";
import type { ContrastResult } from "@/lib/contrast-analyzer";
import { ContrastIcon } from "@/components/ui/icons";

interface ContrastBadgeProps {
  contrast: ContrastResult;
  textMode: "light" | "dark";
  onToggleTextMode: () => void;
}

export function ContrastBadge({
  contrast,
  textMode,
  onToggleTextMode,
}: ContrastBadgeProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getScoreColor = () => {
    switch (contrast.wcagRating) {
      case "AAA":
        return {
          bg: "bg-emerald-500/15",
          border: "border-emerald-500/30",
          text: "text-emerald-400",
          dot: "bg-emerald-400",
        };
      case "AA":
        return {
          bg: "bg-sky-500/15",
          border: "border-sky-500/30",
          text: "text-sky-400",
          dot: "bg-sky-400",
        };
      case "AA Large":
        return {
          bg: "bg-amber-500/15",
          border: "border-amber-500/30",
          text: "text-amber-400",
          dot: "bg-amber-400",
        };
      default:
        return {
          bg: "bg-rose-500/15",
          border: "border-rose-500/30",
          text: "text-rose-400",
          dot: "bg-rose-400",
        };
    }
  };

  const colors = getScoreColor();

  return (
    <div className="relative inline-flex items-center gap-1.5">
      {/* Main Trigger Pill */}
      <button
        type="button"
        onClick={() => setShowDetails(!showDetails)}
        className={`flex items-center gap-2 pl-2.5 pr-3 py-1 rounded-full text-xs font-mono font-medium border backdrop-blur-md transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02] ${colors.bg} ${colors.border} ${colors.text}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
        <span className="font-semibold tracking-tight">{contrast.scoreLabel}</span>
        <span className="text-[11px] opacity-75">({contrast.activeRatio}:1)</span>
      </button>

      {/* Light / Dark Mode Quick Toggle */}
      <button
        type="button"
        onClick={onToggleTextMode}
        title="Toggle text contrast mode (Light vs Dark text)"
        aria-label="Toggle text contrast mode"
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border border-white/15 bg-[#0e0e0f]/80 text-white/85 hover:text-white hover:bg-white/10 backdrop-blur-md transition-all duration-200 cursor-pointer"
      >
        <ContrastIcon size={13} className="text-[#cc97ff]" />
        <span className="text-[11px] capitalize">{textMode} Text</span>
      </button>

      {/* Dropdown Details Popover */}
      {showDetails && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDetails(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full left-0 mt-2 z-50 w-72 p-4 rounded-2xl border border-white/15 bg-[#131315] shadow-2xl backdrop-blur-xl animate-[fadeInUp_0.2s_ease-out]">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
              <span className="text-xs font-semibold text-white/90">
                WCAG 2.1 Contrast Analysis
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
              >
                {contrast.wcagRating}
              </span>
            </div>

            <div className="space-y-2 text-xs mb-3 font-mono">
              <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-white/5">
                <span className="text-white/70">Light Text (#fff):</span>
                <span className="font-bold text-white">
                  {contrast.lightRatio}:1{" "}
                  {contrast.bestMode === "light" && "✦ Best"}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-white/5">
                <span className="text-white/70">Dark Text (#0f172a):</span>
                <span className="font-bold text-white">
                  {contrast.darkRatio}:1{" "}
                  {contrast.bestMode === "dark" && "✦ Best"}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-white/70 leading-relaxed mb-3">
              {contrast.recommendation}
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
              <span>AA req: 4.5:1</span>
              <span>AAA req: 7.0:1</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
