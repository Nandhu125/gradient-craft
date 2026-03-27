"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GRADIENTS } from "@/data/gradients";
import { safeStyle } from "@/lib/utils";

interface Props {
  hasActive: boolean;
}

const PREVIEW_GRADIENTS = GRADIENTS.slice(0, 6);

const FEATURES = [
  { icon: "gradient", label: "Gradients" },
  { icon: "grid_view", label: "Patterns" },
  { icon: "grain", label: "Noise" },
  { icon: "animation", label: "Animation" },
  { icon: "code", label: "CSS Export" },
];

export function Hero({ hasActive }: Props) {
  const [previewIdx, setPreviewIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewIdx((i) => (i + 1) % PREVIEW_GRADIENTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative z-[1] overflow-hidden px-5 sm:px-[4vw] flex justify-center text-center min-h-[85vh] sm:min-h-[80vh] items-center py-20 sm:py-0"
    >
      <div className="max-w-[1000px] mx-auto relative z-[2] flex flex-col items-center w-full">
        {/* Badge */}
        <div className="animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_both] mb-6 sm:mb-8 w-fit">
          <div
            className={`inline-flex items-center gap-2 sm:gap-3 pr-4 sm:pr-5 pl-3 sm:pl-4 py-1.5 rounded-full border text-[11px] sm:text-[13px] font-medium transition-colors duration-400 backdrop-blur-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${
              hasActive
                ? "bg-white/10 border-white/20 text-white"
                : "bg-white border-black/5 text-[#444]"
            }`}
          >
            <span className={`w-2 h-2 rounded-full bg-[#4f46e5] animate-[pulse_2s_ease-in-out_infinite]`} />
            <span className="font-semibold tracking-tight whitespace-nowrap">
              CSS Background Studio
            </span>
            <span className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${hasActive ? "bg-white/40" : "bg-black/20"}`} />
            <span className={`font-mono text-[9px] sm:text-[11px] uppercase tracking-wider font-semibold ${hasActive ? "text-white/80" : "text-[#888]"}`}>
              Free &amp; Open Source
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`text-[clamp(28px,8vw,72px)] font-[800] leading-[1.1] sm:leading-[1.05] tracking-[-0.03em] mb-4 transition-colors duration-400 ease-in-out [animation-delay:0.1s] animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_both] ${
            hasActive ? "text-white" : "text-[#111]"
          }`}
        >
          Design. Layer.{" "}
          <span className="text-nowrap bg-[linear-gradient(90deg,#4f46e5_0%,#ec4899_25%,#f59e0b_50%,#ec4899_75%,#4f46e5_100%)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[shine_8s_linear_infinite] inline-block">
            Ship.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-[15px] sm:text-[clamp(16px,2vw,20px)] leading-[1.6] max-w-[600px] mx-auto mb-8 transition-colors duration-400 ease-in-out [animation-delay:0.2s] animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_both] ${
            hasActive ? "text-white/70" : "text-[#666]"
          }`}
        >
          The all-in-one CSS background composer. Stack gradients, patterns,
          <br className="hidden sm:block" />
          noise, and animations — then copy production-ready CSS.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 [animation-delay:0.3s] w-full sm:w-auto animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_both]">
          <Link
            href="/studio"
            className={`px-8 py-4 rounded-full border-none text-[17px] font-bold cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] no-underline ${
              hasActive ? "bg-white text-black" : "bg-[#111] text-white"
            }`}
          >
            Open Studio
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <a
            href="https://github.com/Nandhu125/gradient-craft"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-7 py-3.5 rounded-full text-[16px] font-semibold no-underline flex items-center justify-center gap-2 transition-all duration-300 border hover:-translate-y-0.5 ${
              hasActive
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-black/5 border-black/10 text-[#111] hover:bg-black/10"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>

        {/* Interactive Preview Card — Studio mockup */}
        <div className="w-full max-w-[680px] [animation-delay:0.4s] animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_both]">
          <div
            className={`rounded-[24px] overflow-hidden border backdrop-blur-[24px] transition-all duration-500 ${
              hasActive
                ? "bg-white/5 border-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
                : "bg-white/80 border-black/[0.06] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]"
            }`}
          >
            {/* Preview gradient area — cycling through gradients */}
            <div className="relative h-[200px] sm:h-[240px] overflow-hidden">
              {PREVIEW_GRADIENTS.map((g, i) => (
                <div
                  key={g.id}
                  className="absolute inset-0 transition-opacity duration-800"
                  style={{
                    ...safeStyle(g.style),
                    opacity: i === previewIdx ? 1 : 0,
                  }}
                />
              ))}
              {/* Overlay with layer icons */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20">
                  {FEATURES.map((f, i) => (
                    <div key={f.icon} className="flex items-center gap-1.5">
                      {i > 0 && <span className="text-white/20 text-[10px]">+</span>}
                      <span className="text-white/90 text-[11px] font-medium">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Info bar */}
            <div className={`px-5 py-4 flex items-center justify-between ${hasActive ? "border-t border-white/10" : "border-t border-black/[0.06]"}`}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1">
                  {PREVIEW_GRADIENTS.slice(0, 4).map((g) => (
                    <div
                      key={g.id}
                      className="w-6 h-6 rounded-full border-2 border-white"
                      style={safeStyle(g.style)}
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className={`text-[13px] font-bold ${hasActive ? "text-white" : "text-[#111]"}`}>
                    5 Composable Layers
                  </div>
                  <div className={`text-[11px] ${hasActive ? "text-white/40" : "text-[#999]"}`}>
                    Gradient · Pattern · Noise · Animation · Base
                  </div>
                </div>
              </div>

              <Link
                href="/studio"
                className={`px-4 py-2 rounded-full text-[13px] font-bold flex items-center gap-2 transition-all duration-300 cursor-pointer border-none no-underline ${
                  hasActive
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-[#111] text-white hover:bg-[#222]"
                }`}
              >
                Try It Free
              </Link>
            </div>

            {/* Dot indicators */}
            <div className="px-5 pb-4 flex items-center justify-center gap-1.5">
              {PREVIEW_GRADIENTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPreviewIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer border-none ${
                    i === previewIdx
                      ? hasActive ? "bg-white w-4" : "bg-[#4f46e5] w-4"
                      : hasActive ? "bg-white/30 hover:bg-white/50" : "bg-black/15 hover:bg-black/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick hint */}
          <p className={`text-[12px] mt-4 transition-colors duration-400 ${hasActive ? "text-white/40" : "text-[#aaa]"}`}>
            No sign-up required. Works with React, Vue, Svelte, or plain HTML &amp; CSS.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseGlow {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </section>
  );
}
