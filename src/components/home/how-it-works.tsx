import Link from "next/link";

const STEPS = [
  {
    num: "01",
    title: "Pick your layers",
    desc: "Toggle on the layers you need — base color, gradient, pattern, noise, or animation. Each layer is independent.",
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
    title: "Adjust properties",
    desc: "Tweak gradient angles, pattern sizes, noise intensity, animation speed — all with sliders and live preview.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Copy the CSS",
    desc: "Hit 'Copy CSS' and paste into your project. You get clean background-image stacks, SVG noise, and @keyframes — ready to use.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 px-5 sm:px-[4vw] relative z-[1] bg-transparent">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-12 sm:mb-14">
          <div className="reveal-node inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] active:bg-white/12 active:mix-blend-difference active:brightness-[2] inactive:bg-white inactive:mix-blend-normal">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span className="font-mono text-[11px] font-bold text-[#b45309] tracking-[0.15em] uppercase">
              How It Works
            </span>
          </div>

          <h2 className="reveal-node text-[clamp(28px,5vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.15] [animation-delay:0.1s] active:text-white active:mix-blend-difference active:brightness-[2] inactive:text-[#111]">
            From blank canvas to finished background
            <br />
            <span className="active:opacity-50 inactive:opacity-60">in under a minute.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="reveal-node text-center flex flex-col items-center"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-500 active:bg-white/10 active:text-white inactive:bg-[#4f46e5]/[0.06] inactive:text-[#4f46e5]">
                {step.icon}
              </div>

              <div className="font-mono text-[11px] font-bold tracking-[0.15em] uppercase mb-2 active:text-white/30 inactive:text-[#666]">
                Step {step.num}
              </div>

              <h3 className="text-[20px] font-bold tracking-[-0.02em] mb-2 active:text-white active:mix-blend-difference active:brightness-[2] inactive:text-[#111]">
                {step.title}
              </h3>

              <p className="text-[14px] leading-[1.6] max-w-[260px] active:text-white/50 inactive:text-[#666]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center reveal-node" style={{ animationDelay: "0.5s" }}>
          <Link
            href="/studio"
            className="inline-block px-7 py-3.5 rounded-full text-[15px] font-bold text-white cursor-pointer transition-all duration-300 border-none hover:-translate-y-0.5 no-underline active:bg-white/10 active:hover:bg-white/20 inactive:bg-[#4f46e5] inactive:hover:bg-[#4338ca] inactive:shadow-[0_8px_24px_-8px_rgba(79,70,229,0.4)]"
          >
            Open the Studio
          </Link>
        </div>
      </div>
    </section>
  );
}
