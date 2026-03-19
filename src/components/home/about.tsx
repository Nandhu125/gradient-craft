"use client";

import { GRADIENTS } from "@/data/gradients";

interface Props {
  hasActive: boolean;
}

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const CATEGORIES = [...new Set(GRADIENTS.map((g) => g.category))];

export function About({ hasActive }: Props) {
  const cardBase = `rounded-[24px] backdrop-blur-[24px] backdrop-saturate-[180%] border transition-all duration-600 ease-premium hover:-translate-y-1`;
  const cardLight = `bg-white/75 border-black/[0.04] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.01)] hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.08),0_0_0_1px_rgba(79,70,229,0.03)] hover:bg-white/[0.9] hover:border-[#4f46e5]/15`;
  const cardDark = `bg-white/5 border-white/15 shadow-none`;

  return (
    <section
      id="about"
      className={`py-20 sm:py-28 px-[clamp(20px,4vw,40px)] relative z-[1] overflow-hidden transition-colors duration-500 ease-in-out ${
        hasActive ? "bg-transparent" : "bg-[#fafaf8]"
      }`}
    >
      {!hasActive && (
        <>
          <div className="blueprint-grid" />
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: NOISE_SVG }}
          />
        </>
      )}

      <div className="max-w-[1100px] mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className={`reveal-node inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] ${
              hasActive ? "bg-white/12 mix-blend-difference brightness-[2]" : "bg-white mix-blend-normal brightness-100"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]" />
            <span className="font-mono text-[11px] font-bold text-[#4f46e5] tracking-[0.15em] uppercase">
              Why GradientCraft
            </span>
          </div>

          <h2
            className={`reveal-node text-[clamp(28px,5vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.15] mb-4 [animation-delay:0.1s] ${
              hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111] mix-blend-normal brightness-100"
            }`}
          >
            No libraries. No dependencies.
            <br />
            <span className="opacity-30">Just CSS that works everywhere.</span>
          </h2>

          <p className={`reveal-node text-[15px] sm:text-[17px] max-w-[520px] mx-auto [animation-delay:0.15s] ${hasActive ? "text-white/50 mix-blend-difference brightness-[2]" : "text-[#888]"}`}>
            Every gradient is pure CSS — no JavaScript animation libraries, no runtime overhead, no bundle bloat.
          </p>
        </div>

        <div className="bento-grid gap-4 sm:gap-5">
          {/* Main card - Performance */}
          <div className="bento-span-2 bento-row-2 reveal-node" style={{ animationDelay: "0.2s" }}>
            <div className={`h-full p-6 sm:p-10 flex flex-col justify-between ${cardBase} ${hasActive ? cardDark : cardLight}`}>
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[18px] bg-[linear-gradient(135deg,#4f46e5,#8b5cf6)] flex items-center justify-center text-white mb-6 shadow-[0_15px_30px_-10px_rgba(79,70,229,0.4)]">
                  <svg width="24" height="24" className="sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>

                <h3 className={`text-[22px] sm:text-[28px] font-extrabold mb-3 tracking-[-0.03em] ${hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111]"}`}>
                  Pure CSS. 60 FPS.
                </h3>

                <p className={`text-[14px] sm:text-[16px] leading-[1.6] max-w-[400px] ${hasActive ? "text-white/60 mix-blend-difference brightness-[2]" : "text-[#666]"}`}>
                  Animations run on the GPU via CSS keyframes — not JavaScript. Your main thread stays free, your users get butter-smooth motion.
                </p>
              </div>

              <div className="mt-8 sm:mt-10 flex items-end gap-4 sm:gap-5">
                <div>
                  <div className="text-[32px] sm:text-[42px] font-extrabold text-[#4f46e5] font-mono leading-none">0ms</div>
                  <div className="text-[9px] sm:text-[10px] text-[#999] font-mono uppercase tracking-[0.15em] mt-2">JS Execution Time</div>
                </div>
                <div className="flex-1 h-px bg-[#4f46e5]/10 mb-2.5" />
                <div className="text-right">
                  <div className="text-[32px] sm:text-[42px] font-extrabold text-[#4f46e5] font-mono leading-none">0kb</div>
                  <div className="text-[9px] sm:text-[10px] text-[#999] font-mono uppercase tracking-[0.15em] mt-2">Added to Bundle</div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy & paste ready */}
          <div className="bento-span-2 reveal-node" style={{ animationDelay: "0.3s" }}>
            <div className={`p-6 sm:p-8 h-full ${cardBase} ${hasActive ? cardDark : cardLight}`}>
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center mb-5">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[18px] flex items-center justify-center text-[#4f46e5] flex-shrink-0 ${hasActive ? "bg-white/8" : "bg-[#4f46e5]/[0.06]"}`}>
                  <svg width="24" height="24" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-[18px] sm:text-[20px] font-extrabold tracking-[-0.02em] mb-1 ${hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111]"}`}>
                    One Click. Full CSS Output.
                  </h3>
                  <p className={`text-[14px] sm:text-[15px] leading-[1.5] ${hasActive ? "text-white/60 mix-blend-difference brightness-[2]" : "text-[#666]"}`}>
                    Each gradient copies as complete CSS — the gradient rule, background-size, and @keyframes. Paste it and it works.
                  </p>
                </div>
              </div>

              {/* Code preview */}
              <div className={`rounded-xl p-4 font-mono text-[11px] sm:text-[12px] leading-[1.7] overflow-hidden ${hasActive ? "bg-white/5 text-white/70" : "bg-[#1a1a2e] text-[#a5b4fc]"}`}>
                <div><span className="text-[#c084fc]">background</span>: linear-gradient(...);</div>
                <div><span className="text-[#c084fc]">background-size</span>: 400% 400%;</div>
                <div><span className="text-[#c084fc]">animation</span>: gradient 8s ease infinite;</div>
              </div>
            </div>
          </div>

          {/* Categories count */}
          <div className="reveal-node" style={{ animationDelay: "0.4s" }}>
            <div className={`p-6 sm:p-8 flex flex-col justify-center items-center text-center h-full ${cardBase} ${hasActive ? cardDark : cardLight}`}>
              <div className="text-[#4f46e5] mb-3">
                <svg width="28" height="28" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <div className="text-[28px] sm:text-[36px] font-extrabold text-[#4f46e5] font-mono leading-none mb-1">{CATEGORIES.length}</div>
              <h3 className={`text-[14px] sm:text-[15px] font-bold mb-1 ${hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111]"}`}>
                Categories
              </h3>
              <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                {CATEGORIES.map((cat) => (
                  <span
                    key={cat}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-full ${hasActive ? "bg-white/8 text-white/50" : "bg-[#4f46e5]/[0.06] text-[#4f46e5]"}`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* MIT Open Source */}
          <div className="reveal-node" style={{ animationDelay: "0.5s" }}>
            <div className={`p-6 sm:p-8 flex flex-col justify-center items-center text-center h-full ${cardBase} ${hasActive ? cardDark : cardLight}`}>
              <div className="text-[#4f46e5] mb-3">
                <svg width="28" height="28" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className={`text-[14px] sm:text-[15px] font-bold ${hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111]"}`}>
                MIT Licensed
              </h3>
              <p className={`text-[10px] sm:text-[11px] font-mono mt-1.5 uppercase tracking-[0.1em] ${hasActive ? "text-white/40 mix-blend-difference brightness-[2]" : "text-[#999]"}`}>
                Free for personal &amp; commercial use
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
