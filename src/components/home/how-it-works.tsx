"use client";

interface Props {
  hasActive: boolean;
  onScrollToCollection: () => void;
}

const STEPS = [
  {
    num: "01",
    title: "Browse",
    desc: "Explore 28 handcrafted gradients across 6 categories. Search by name, tag, or vibe.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Preview",
    desc: "Click any gradient to see it full-screen. Tune speed, timing, and direction in real-time.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Copy & Ship",
    desc: "One click copies the CSS + keyframes. Paste into your project. Zero dependencies.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
  },
];

export function HowItWorks({ hasActive, onScrollToCollection }: Props) {
  return (
    <section
      className={`py-16 sm:py-24 px-5 sm:px-[4vw] relative z-[1] transition-colors duration-500 ${
        hasActive ? "bg-transparent" : "bg-transparent"
      }`}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <div
            className={`reveal-node inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] ${
              hasActive ? "bg-white/12 mix-blend-difference brightness-[2]" : "bg-white mix-blend-normal"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span className="font-mono text-[11px] font-bold text-[#f59e0b] tracking-[0.15em] uppercase">
              How It Works
            </span>
          </div>

          <h2
            className={`reveal-node text-[clamp(28px,5vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.15] [animation-delay:0.1s] ${
              hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111]"
            }`}
          >
            Three steps. Zero friction.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`reveal-node text-center flex flex-col items-center`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              {/* Icon circle */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-500 ${
                  hasActive
                    ? "bg-white/10 text-white"
                    : "bg-[#4f46e5]/[0.06] text-[#4f46e5]"
                }`}
              >
                {step.icon}
              </div>

              {/* Step number */}
              <div className={`font-mono text-[11px] font-bold tracking-[0.15em] uppercase mb-2 ${
                hasActive ? "text-white/30" : "text-[#bbb]"
              }`}>
                Step {step.num}
              </div>

              <h3 className={`text-[20px] font-bold tracking-[-0.02em] mb-2 ${
                hasActive ? "text-white mix-blend-difference brightness-[2]" : "text-[#111]"
              }`}>
                {step.title}
              </h3>

              <p className={`text-[14px] leading-[1.6] max-w-[260px] ${
                hasActive ? "text-white/50" : "text-[#888]"
              }`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center reveal-node" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={onScrollToCollection}
            className={`px-7 py-3.5 rounded-full text-[15px] font-bold cursor-pointer transition-all duration-300 border-none hover:-translate-y-0.5 ${
              hasActive
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-[#4f46e5] text-white hover:bg-[#4338ca] shadow-[0_8px_24px_-8px_rgba(79,70,229,0.4)]"
            }`}
          >
            Try It Now
          </button>
        </div>
      </div>
    </section>
  );
}
