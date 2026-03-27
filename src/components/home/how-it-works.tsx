"use client";

import Link from "next/link";

interface Props {
  hasActive: boolean;
}

const STEPS = [
  {
    num: "01",
    title: "Layer",
    desc: "Stack gradients, patterns, noise, and base colors. Toggle each layer on or off independently.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Customize",
    desc: "Fine-tune every property — gradient angles, pattern sizes, noise intensity, animation speed and direction.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Export",
    desc: "One click copies production-ready CSS — background layers, noise SVG, keyframes. Paste and ship.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export function HowItWorks({ hasActive }: Props) {
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
            Three layers. One click. Done.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="reveal-node text-center flex flex-col items-center"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-500 ${
                  hasActive
                    ? "bg-white/10 text-white"
                    : "bg-[#4f46e5]/[0.06] text-[#4f46e5]"
                }`}
              >
                {step.icon}
              </div>

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
          <Link
            href="/studio"
            className={`inline-block px-7 py-3.5 rounded-full text-[15px] font-bold cursor-pointer transition-all duration-300 border-none hover:-translate-y-0.5 no-underline ${
              hasActive
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-[#4f46e5] text-white hover:bg-[#4338ca] shadow-[0_8px_24px_-8px_rgba(79,70,229,0.4)]"
            }`}
          >
            Try the Studio
          </Link>
        </div>
      </div>
    </section>
  );
}
