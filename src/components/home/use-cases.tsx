"use client";

import { GRADIENTS } from "@/data/gradients";
import { safeStyle } from "@/lib/utils";

interface Props {
  hasActive: boolean;
}

const SHOWCASE = [
  { gradientId: "sunset-blaze", label: "Landing Pages", desc: "Eye-catching hero sections that grab attention instantly" },
  { gradientId: "cosmic-nebula", label: "Card Backgrounds", desc: "Elevate UI cards with subtle animated depth" },
  { gradientId: "neon-pulse", label: "Call-to-Action Buttons", desc: "High-conversion buttons that demand clicks" },
  { gradientId: "holographic", label: "Brand Identity", desc: "Unique gradient palettes for standout branding" },
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
              Use Cases
            </span>
          </div>

          <h2
            className={`reveal-node text-[clamp(28px,5vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.15] mb-4 [animation-delay:0.1s] ${
              hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111]"
            }`}
          >
            Not just pretty colors.
            <br />
            <span className={hasActive ? "opacity-50" : "opacity-30"}>Real use cases, real impact.</span>
          </h2>

          <p className={`reveal-node text-[15px] sm:text-[17px] max-w-[500px] mx-auto [animation-delay:0.15s] ${hasActive ? "text-white/50" : "text-[#888]"}`}>
            See how developers use GradientCraft in production.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {SHOWCASE.map(({ gradientId, label, desc }, idx) => {
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
                {/* Mini gradient preview */}
                <div className="relative h-[140px] sm:h-[160px] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={safeStyle(g.style)}
                  />

                  {/* Mockup overlay based on use case */}
                  {idx === 0 && (
                    /* Landing page mockup */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/15 backdrop-blur-sm rounded-xl px-6 py-4 text-center border border-white/20">
                        <div className="text-white text-[13px] font-bold mb-1">Your Next Big Thing</div>
                        <div className="text-white/60 text-[10px] mb-3">The future starts here</div>
                        <div className="bg-white text-black text-[10px] font-bold px-4 py-1.5 rounded-full inline-block">Get Started</div>
                      </div>
                    </div>
                  )}
                  {idx === 1 && (
                    /* Card mockup */
                    <div className="absolute inset-4 flex items-end">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 w-full border border-white/10">
                        <div className="flex gap-2 items-center">
                          <div className="w-8 h-8 rounded-full bg-white/20" />
                          <div>
                            <div className="h-2 w-20 bg-white/40 rounded-full mb-1" />
                            <div className="h-1.5 w-14 bg-white/20 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {idx === 2 && (
                    /* CTA button mockup */
                    <div className="absolute inset-0 flex items-center justify-center gap-3">
                      <div className="bg-white text-[11px] font-bold px-5 py-2.5 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform">
                        Sign Up Free
                      </div>
                      <div className="border border-white/40 text-white text-[11px] font-bold px-5 py-2.5 rounded-full">
                        Learn More
                      </div>
                    </div>
                  )}
                  {idx === 3 && (
                    /* Brand identity mockup */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-[24px] font-[800] tracking-[-0.03em] mb-1 drop-shadow-lg">Acme</div>
                        <div className="text-white/60 text-[10px] tracking-[0.2em] uppercase">Studio</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Label */}
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
