"use client";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

interface Props {
  hasActive: boolean;
}

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
              Why This Tool
            </span>
          </div>

          <h2
            className={`reveal-node text-[clamp(28px,5vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.15] mb-4 [animation-delay:0.1s] ${
              hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111] mix-blend-normal brightness-100"
            }`}
          >
            The output is pure CSS.
            <br />
            <span className="opacity-30">No runtime. No JavaScript. No bloat.</span>
          </h2>

          <p className={`reveal-node text-[15px] sm:text-[17px] max-w-[520px] mx-auto [animation-delay:0.15s] ${hasActive ? "text-white/50 mix-blend-difference brightness-[2]" : "text-[#888]"}`}>
            Everything you create in the studio exports as standard CSS that works in any browser, any framework, any project. Zero dependencies in the final output.
          </p>
        </div>

        <div className="bento-grid gap-4 sm:gap-5">
          {/* Main card */}
          <div className="bento-span-2 bento-row-2 reveal-node" style={{ animationDelay: "0.2s" }}>
            <div className={`h-full p-6 sm:p-10 flex flex-col justify-between ${cardBase} ${hasActive ? cardDark : cardLight}`}>
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[18px] bg-[linear-gradient(135deg,#4f46e5,#8b5cf6)] flex items-center justify-center text-white mb-6 shadow-[0_15px_30px_-10px_rgba(79,70,229,0.4)]">
                  <svg width="24" height="24" className="sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>

                <h3 className={`text-[22px] sm:text-[28px] font-extrabold mb-3 tracking-[-0.03em] ${hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111]"}`}>
                  Layered backgrounds, composed visually.
                </h3>

                <p className={`text-[14px] sm:text-[16px] leading-[1.6] max-w-[400px] ${hasActive ? "text-white/60 mix-blend-difference brightness-[2]" : "text-[#666]"}`}>
                  Instead of hand-writing stacked background-image rules, pattern SVGs, and animation keyframes — just toggle layers on, adjust sliders, and let the studio generate the CSS for you.
                </p>
              </div>

              <div className="mt-8 sm:mt-10 flex items-end gap-4 sm:gap-5">
                <div>
                  <div className="text-[32px] sm:text-[42px] font-extrabold text-[#4f46e5] font-mono leading-none">5</div>
                  <div className="text-[9px] sm:text-[10px] text-[#999] font-mono uppercase tracking-[0.15em] mt-2">Layer Types</div>
                </div>
                <div className="flex-1 h-px bg-[#4f46e5]/10 mb-2.5" />
                <div className="text-right">
                  <div className="text-[32px] sm:text-[42px] font-extrabold text-[#4f46e5] font-mono leading-none">0kb</div>
                  <div className="text-[9px] sm:text-[10px] text-[#999] font-mono uppercase tracking-[0.15em] mt-2">JS in Output</div>
                </div>
              </div>
            </div>
          </div>

          {/* CSS Output card */}
          <div className="bento-span-2 reveal-node" style={{ animationDelay: "0.3s" }}>
            <div className={`p-6 sm:p-8 h-full ${cardBase} ${hasActive ? cardDark : cardLight}`}>
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center mb-5">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[18px] flex items-center justify-center text-[#4f46e5] flex-shrink-0 ${hasActive ? "bg-white/8" : "bg-[#4f46e5]/[0.06]"}`}>
                  <svg width="24" height="24" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-[18px] sm:text-[20px] font-extrabold tracking-[-0.02em] mb-1 ${hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111]"}`}>
                    One-click CSS export
                  </h3>
                  <p className={`text-[14px] sm:text-[15px] leading-[1.5] ${hasActive ? "text-white/60 mix-blend-difference brightness-[2]" : "text-[#666]"}`}>
                    The generated CSS includes stacked background-image layers, background-size values, noise as an inline SVG data URI, and animation keyframes. Paste it and it works.
                  </p>
                </div>
              </div>

              <div className={`rounded-xl p-4 font-mono text-[11px] sm:text-[12px] leading-[1.7] overflow-hidden ${hasActive ? "bg-white/5 text-white/70" : "bg-[#1a1a2e] text-[#a5b4fc]"}`}>
                <div><span className="text-[#c084fc]">background-image</span>:</div>
                <div className="pl-4 text-[#e2e8f0]/60">url(&quot;data:image/svg+xml,...&quot;), {/* noise */}</div>
                <div className="pl-4 text-[#e2e8f0]/60">radial-gradient(...), {/* dots pattern */}</div>
                <div className="pl-4 text-[#e2e8f0]/60">linear-gradient(135deg, #667eea, #764ba2);</div>
                <div><span className="text-[#c084fc]">background-color</span>: #0a0a0a;</div>
                <div><span className="text-[#c084fc]">animation</span>: gradient 8s ease infinite;</div>
              </div>
            </div>
          </div>

          {/* What's included */}
          <div className="reveal-node" style={{ animationDelay: "0.4s" }}>
            <div className={`p-6 sm:p-8 flex flex-col justify-center items-center text-center h-full ${cardBase} ${hasActive ? cardDark : cardLight}`}>
              <div className="text-[#4f46e5] mb-3">
                <svg width="28" height="28" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className={`text-[14px] sm:text-[15px] font-bold mb-2 ${hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111]"}`}>
                Included in output
              </h3>
              <div className="flex flex-wrap gap-1.5 justify-center mt-1">
                {["background-image", "background-size", "background-color", "animation", "@keyframes"].map((item) => (
                  <span
                    key={item}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-full ${hasActive ? "bg-white/8 text-white/50" : "bg-[#4f46e5]/[0.06] text-[#4f46e5]"}`}
                  >
                    {item}
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
