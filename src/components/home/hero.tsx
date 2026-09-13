"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { GRADIENTS } from "@/data/gradients";
import { safeStyle } from "@/lib/utils";
import { analyzeColorsContrast } from "@/lib/contrast-analyzer";
import { MonitorIcon, CardIcon, SmartphoneIcon } from "@/components/ui/icons";

interface Props {
  hasActive: boolean;
}

const PREVIEW_GRADIENTS = GRADIENTS.slice(0, 6);

type HeroContextMode = "hero" | "card" | "mobile";

export function Hero({ hasActive }: Props) {
  const [previewIdx, setPreviewIdx] = useState(0);
  const [contextMode, setContextMode] = useState<HeroContextMode>("hero");

  const currentGradient = PREVIEW_GRADIENTS[previewIdx];

  // Auto-advance gradient slides every 6s unless user interacts
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewIdx((i) => (i + 1) % PREVIEW_GRADIENTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Compute live contrast rating for currently displayed gradient
  const contrastResult = useMemo(() => {
    const hexMatches = currentGradient.css.match(/#[0-9a-fA-F]{3,8}/g) ?? ["#0f172a"];
    return analyzeColorsContrast(hexMatches, "light");
  }, [currentGradient]);

  return (
    <section
      id="home"
      className="relative z-[1] overflow-hidden px-5 sm:px-[4vw] flex justify-center text-center min-h-[88vh] items-center py-20 sm:py-12"
    >
      <div className="max-w-[1000px] mx-auto relative z-[2] flex flex-col items-center w-full">
        {/* Top Feature Pill */}
        <div className="animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_both] mb-6 sm:mb-8 w-fit">
          <div
            className={`inline-flex items-center gap-2 sm:gap-3 pr-4 sm:pr-5 pl-3 sm:pl-4 py-1.5 rounded-full border text-[11px] sm:text-[13px] font-medium transition-colors duration-400 backdrop-blur-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${
              hasActive
                ? "bg-white/10 border-white/20 text-white"
                : "bg-white border-black/5 text-[#444]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#4f46e5] animate-[pulse_2s_ease-in-out_infinite]" />
            <span className="font-semibold tracking-tight whitespace-nowrap">
              60FPS Pure CSS · Real-Time WCAG Contrast Testing
            </span>
            <span className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${hasActive ? "bg-white/40" : "bg-black/20"}`} />
            <span className={`font-mono text-[9px] sm:text-[11px] uppercase tracking-wider font-semibold ${hasActive ? "text-white/80" : "text-[#666]"}`}>
              Free &amp; Open Source
            </span>
          </div>
        </div>

        {/* Repositioned Value-Prop Headline */}
        <h1
          className={`text-[clamp(28px,7vw,62px)] font-[800] leading-[1.12] tracking-[-0.035em] mb-5 transition-colors duration-400 ease-in-out max-w-[820px] ${
            hasActive ? "text-white" : "text-[#111]"
          }`}
        >
          Animated CSS backgrounds tested for{" "}
          <span className="text-nowrap bg-[linear-gradient(90deg,#4f46e5_0%,#ec4899_25%,#f59e0b_50%,#ec4899_75%,#4f46e5_100%)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[shine_8s_linear_infinite] inline-block">
            real-world UI readability.
          </span>
        </h1>

        {/* Repositioned Subheading */}
        <p
          className={`text-[15px] sm:text-[clamp(16px,2vw,19px)] leading-[1.65] max-w-[620px] mx-auto mb-8 transition-colors duration-400 ease-in-out [animation-delay:0.2s] animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_both] ${
            hasActive ? "text-white/70" : "text-[#555]"
          }`}
        >
          Compose layered gradients, patterns, and film grain. Preview legibility across Hero headers, UI cards, and mobile screens with real-time contrast checking.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 [animation-delay:0.3s] w-full sm:w-auto animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_both]">
          <Link
            href="/studio"
            className={`px-8 py-4 rounded-full border-none text-[16px] sm:text-[17px] font-bold cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] no-underline ${
              hasActive ? "bg-white text-black" : "bg-[#111] text-white"
            }`}
          >
            Launch Gradient Studio
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <a
            href="https://github.com/Nandhu125/gradient-craft"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-7 py-3.5 rounded-full text-[15px] sm:text-[16px] font-semibold no-underline flex items-center justify-center gap-2 transition-all duration-300 border hover:-translate-y-0.5 ${
              hasActive
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-black/5 border-black/10 text-[#111] hover:bg-black/10"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>

        {/* Interactive Realistic Preview Card */}
        <div className="w-full max-w-[740px] [animation-delay:0.4s] animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_both]">
          <div
            className={`rounded-[24px] overflow-hidden border backdrop-blur-[24px] transition-all duration-500 text-left ${
              hasActive
                ? "bg-white/5 border-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
                : "bg-white/85 border-black/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]"
            }`}
          >
            {/* Top Interactive Toolbar */}
            <div className="px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 border-black/[0.06]">
              {/* Context Selector Buttons */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/[0.04]">
                {[
                  { id: "hero", label: "Hero UI", icon: <MonitorIcon size={13} /> },
                  { id: "card", label: "Card UI", icon: <CardIcon size={13} /> },
                  { id: "mobile", label: "Mobile", icon: <SmartphoneIcon size={13} /> },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setContextMode(t.id as HeroContextMode)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border-none cursor-pointer transition-all ${
                      contextMode === t.id
                        ? "bg-white text-black shadow-sm"
                        : "text-[#666] hover:text-black"
                    }`}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Live Contrast Score Badge */}
              <div className="flex items-center gap-2">
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                    contrastResult.wcagRating === "AAA"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : contrastResult.wcagRating === "AA"
                      ? "bg-sky-50 text-sky-700 border-sky-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      contrastResult.wcagRating === "AAA"
                        ? "bg-emerald-500"
                        : "bg-sky-500"
                    }`}
                  />
                  <span>
                    Text Contrast: {contrastResult.activeRatio}:1 ({contrastResult.wcagRating})
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Canvas with Realistic UI Mockup */}
            <div className="relative h-[240px] sm:h-[280px] overflow-hidden">
              {/* Gradient Backgrounds */}
              {PREVIEW_GRADIENTS.map((g, i) => (
                <div
                  key={g.id}
                  className="absolute inset-0 transition-opacity duration-800"
                  style={{
                    ...safeStyle(g.style),
                    opacity: i === previewIdx ? 1 : 0,
                    animationName: i === previewIdx ? undefined : "none",
                  }}
                />
              ))}

              {/* Realistic Overlays */}
              <div className="absolute inset-0 flex items-center justify-center p-6 select-none">
                {contextMode === "hero" && (
                  <div className="w-full max-w-[520px] p-5 rounded-2xl bg-black/35 backdrop-blur-md border border-white/20 text-white text-center shadow-xl">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-mono tracking-wider uppercase mb-2">
                      Live Component Preview
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold tracking-tight mb-1 text-white">
                      {currentGradient.name}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed mb-3 max-w-[380px] mx-auto">
                      Checking text legibility against layered CSS background at 60 frames per second.
                    </p>
                    <div className="flex justify-center gap-2">
                      <span className="px-3 py-1 rounded-lg bg-white text-black text-xs font-bold">
                        Primary CTA
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-white/15 border border-white/20 text-white text-xs font-medium">
                        Documentation
                      </span>
                    </div>
                  </div>
                )}

                {contextMode === "card" && (
                  <div className="grid grid-cols-2 gap-3 w-full max-w-[480px]">
                    <div className="p-4 rounded-xl bg-black/40 backdrop-blur-xl border border-white/20 text-white">
                      <div className="text-[10px] font-mono opacity-60 uppercase mb-1">Growth Index</div>
                      <div className="text-2xl font-black mb-1">+48.2%</div>
                      <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                        <div className="w-3/4 h-full bg-emerald-400" />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white flex flex-col justify-between">
                      <div className="text-[10px] font-mono opacity-60 uppercase">WCAG Status</div>
                      <div className="text-sm font-bold text-emerald-300">
                        {contrastResult.scoreLabel}
                      </div>
                      <div className="text-[10px] opacity-75">Full Color Compliance</div>
                    </div>
                  </div>
                )}

                {contextMode === "mobile" && (
                  <div className="w-[180px] h-[220px] rounded-[24px] p-2 bg-neutral-950 border-2 border-neutral-700 shadow-2xl flex flex-col justify-between">
                    <div className="w-12 h-3 rounded-full bg-black mx-auto mb-2" />
                    <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white text-center my-auto">
                      <div className="text-[9px] font-bold">Mobile Viewport</div>
                      <div className="text-[8px] opacity-75 mt-0.5">Tested on OLED</div>
                    </div>
                    <div className="w-12 h-1 rounded-full bg-white/40 mx-auto" />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Swatches & Studio Link */}
            <div className={`px-5 py-3.5 flex items-center justify-between ${hasActive ? "border-t border-white/10" : "border-t border-black/[0.06]"}`}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1">
                  {PREVIEW_GRADIENTS.map((g, i) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setPreviewIdx(i)}
                      aria-label={`Select ${g.name}`}
                      className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer p-0 ${
                        i === previewIdx ? "scale-115 border-indigo-600 z-10" : "border-white hover:scale-105"
                      }`}
                      style={safeStyle(g.style)}
                    />
                  ))}
                </div>
                <div className="text-left hidden sm:block">
                  <div className={`text-[12px] font-bold ${hasActive ? "text-white" : "text-[#111]"}`}>
                    {currentGradient.name}
                  </div>
                  <div className={`text-[10px] font-mono ${hasActive ? "text-white/40" : "text-[#777]"}`}>
                    Preset #{previewIdx + 1} of {PREVIEW_GRADIENTS.length}
                  </div>
                </div>
              </div>

              <Link
                href="/studio"
                className={`px-4 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer border-none no-underline ${
                  hasActive
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-[#111] text-white hover:bg-[#222]"
                }`}
              >
                Customize in Studio →
              </Link>
            </div>
          </div>

          <p className={`text-[12px] mt-4 transition-colors duration-400 ${hasActive ? "text-white/40" : "text-[#666]"}`}>
            No sign-up required · Zero JavaScript animation thread overhead · Plain CSS &amp; Tailwind
          </p>
        </div>
      </div>
    </section>
  );
}
