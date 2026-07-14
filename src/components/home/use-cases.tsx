import { GRADIENTS } from "@/data/gradients";
import { safeStyle } from "@/lib/utils";

const FEATURES = [
  {
    gradientId: "sunset-blaze",
    label: "Gradient Builder",
    desc: "Choose linear, radial, or conic gradients. Set custom angles, add up to 6 color stops, or pick from 25+ built-in presets.",
    overlay: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-3 w-28 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg" />
          <div className="text-white/80 text-[11px] font-mono bg-black/30 px-2.5 py-1 rounded backdrop-blur-sm">135deg</div>
        </div>
      </div>
    ),
  },
  {
    gradientId: "cosmic-nebula",
    label: "Pattern Overlay",
    desc: "Layer dot grids, lines, diagonals, checkerboards, or crosses on top of any background. Control size, color, and opacity.",
    overlay: (
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }} />
    ),
  },
  {
    gradientId: "neon-pulse",
    label: "Noise Texture",
    desc: "Add SVG-based grain for film-like texture, frosted glass effects, or subtle depth. Dial intensity and opacity independently.",
    overlay: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 bg-black/20 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/15">
          <div className="text-white/80 text-[12px] font-medium">Noise Intensity</div>
          <div className="w-32 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    ),
  },
  {
    gradientId: "holographic",
    label: "CSS Animation",
    desc: "Animate your gradient with GPU-powered CSS keyframes. Pick a preset, set speed (0.25x-3x), and choose direction.",
    overlay: (
      <div className="absolute inset-0 flex items-center justify-center gap-3">
        <div className="bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 text-white text-[11px] font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-[pulse_1.5s_ease-in-out_infinite]" />
          1.5x speed · alternate
        </div>
      </div>
    ),
  },
];

function getGradient(id: string) {
  return GRADIENTS.find((g) => g.id === id)!;
}

export function UseCases() {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-[4vw] relative z-[1] transition-colors duration-500 active:bg-transparent inactive:bg-[#fafaf8]">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="reveal-node inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] active:bg-white/12 active:mix-blend-difference active:brightness-[2] inactive:bg-white inactive:mix-blend-normal">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ec4899]" />
            <span className="font-mono text-[11px] font-bold text-[#ec4899] tracking-[0.15em] uppercase">
              What You Can Build
            </span>
          </div>

          <h2 className="reveal-node text-[clamp(28px,5vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.15] mb-4 [animation-delay:0.1s] active:text-white active:mix-blend-difference active:brightness-[2] inactive:text-[#111]">
            Four layer types, one output.
          </h2>

          <p className="reveal-node text-[15px] sm:text-[17px] max-w-[540px] mx-auto [animation-delay:0.15s] active:text-white/50 inactive:text-[#888]">
            Each layer stacks on top of the previous one. Enable what you need, disable what you don&apos;t. The studio composes them into a single CSS block.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {FEATURES.map(({ gradientId, label, desc, overlay }, idx) => {
            const g = getGradient(gradientId);
            return (
              <div
                key={gradientId}
                className="reveal-node rounded-[24px] overflow-hidden border backdrop-blur-[24px] transition-all duration-500 hover:-translate-y-1 group active:bg-white/5 active:border-white/12 inactive:bg-white/80 inactive:border-black/[0.05] inactive:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] inactive:hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]"
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
                  <h3 className="text-[16px] font-bold mb-1 active:text-white inactive:text-[#111]">
                    {label}
                  </h3>
                  <p className="text-[13px] leading-[1.6] active:text-white/50 inactive:text-[#888]">
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
