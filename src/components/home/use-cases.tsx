"use client";

import { GRADIENTS } from "@/data/gradients";
import { safeStyle } from "@/lib/utils";

interface Props {
  hasActive: boolean;
}

const FEATURES = [
  {
    gradientId: "sunset-blaze",
    label: "Gradients",
    desc: "Linear, radial, or conic — pick a type, set angle, add up to 6 color stops, or load from 25+ presets.",
    overlay: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-3 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg" />
          <div className="text-white/80 text-[11px] font-mono bg-black/30 px-2 py-1 rounded backdrop-blur-sm">135°</div>
        </div>
      </div>
    ),
  },
  {
    gradientId: "cosmic-nebula",
    label: "Patterns",
    desc: "Dots, grids, lines, diagonals, checkerboards, and crosses. Adjust size, color, and opacity per-pattern.",
    overlay: (
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }} />
    ),
  },
  {
    gradientId: "neon-pulse",
    label: "Noise & Grain",
    desc: "Add texture with SVG-based noise. Control intensity and opacity for film grain, frosted glass, or subtle texture.",
    overlay: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/15">
          <div className="text-white/70 text-[11px] font-mono">feTurbulence · fractalNoise</div>
        </div>
      </div>
    ),
  },
  {
    gradientId: "holographic",
    label: "Animation",
    desc: "Bring backgrounds to life with GPU-powered CSS animations. Choose presets, control speed and direction.",
    overlay: (
      <div className="absolute inset-0 flex items-center justify-center gap-3">
        <div className="bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 text-white text-[11px] font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-[pulse_1.5s_ease-in-out_infinite]" />
          Animating
        </div>
      </div>
    ),
  },
];

function getGradient(id: string) {
  return GRADIENTS.find((g) => g.id === id)!;
}

export function UseCases({ hasActive }: Props) {
  return (
    <section
      className={`py-20 sm:py-28 px-5 sm:px-[4vw] relative z-[1] transition-colors duration-500 ${
        hasActive ? "bg-transparent" : "bg-[#fafaf8]"
      }`}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className={`reveal-node inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] ${
              hasActive ? "bg-white/12 mix-blend-difference brightness-[2]" : "bg-white mix-blend-normal"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#ec4899]" />
            <span className="font-mono text-[11px] font-bold text-[#ec4899] tracking-[0.15em] uppercase">
              Features
            </span>
          </div>

          <h2
            className={`reveal-node text-[clamp(28px,5vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.15] mb-4 [animation-delay:0.1s] ${
              hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111]"
            }`}
          >
            Everything you need.
            <br />
            <span className={hasActive ? "opacity-50" : "opacity-30"}>Nothing you don&apos;t.</span>
          </h2>

          <p className={`reveal-node text-[15px] sm:text-[17px] max-w-[500px] mx-auto [animation-delay:0.15s] ${hasActive ? "text-white/50" : "text-[#888]"}`}>
            Five composable layers. One visual editor. Zero dependencies in the output.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {FEATURES.map(({ gradientId, label, desc, overlay }, idx) => {
            const g = getGradient(gradientId);
            return (
              <div
                key={gradientId}
                className={`reveal-node rounded-[24px] overflow-hidden border backdrop-blur-[24px] transition-all duration-500 hover:-translate-y-1 group ${
                  hasActive
                    ? "bg-white/5 border-white/12"
                    : "bg-white/80 border-black/[0.05] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]"
                }`}
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                <div className="relative h-[140px] sm:h-[160px] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={safeStyle(g.style)}
                  />
                  {overlay}
                </div>

                <div className="p-5">
                  <h3 className={`text-[16px] font-bold mb-1 ${hasActive ? "text-white" : "text-[#111]"}`}>
                    {label}
                  </h3>
                  <p className={`text-[13px] leading-[1.5] ${hasActive ? "text-white/50" : "text-[#888]"}`}>
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
