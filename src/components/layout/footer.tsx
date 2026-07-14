import { Logo } from "@/components/ui/logo";
import { GitHubIcon, XSocialIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="py-16 sm:py-24 px-[clamp(20px,4vw,40px)] pb-10 sm:pb-16 relative z-[1] transition-all duration-600 ease-in-out overflow-hidden border-t active:bg-transparent active:border-t-white/10 inactive:bg-[#fafaf8] inactive:border-t-black/[0.03]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(79,70,229,0.03)_0%,transparent_70%)] blur-[40px] pointer-events-none z-0 active:hidden" />

      <div className="max-w-[1000px] mx-auto relative z-[1]">
        {/* Top: Logo + CTA */}
        <div className="flex flex-col items-center mb-12 sm:mb-16">
          <div className="inline-flex p-3 rounded-[20px] backdrop-blur-[12px] mb-4 transition-all duration-500 active:shadow-[0_4px_20px_rgba(0,0,0,0.1)] inactive:shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
            <Logo size={36} />
          </div>
          <h2 className="font-mono text-[18px] sm:text-[20px] font-extrabold tracking-[-0.07em] mb-3 transition-all duration-500 active:text-white inactive:text-[#111]">
            GradientCraft
          </h2>
          <p className="text-[15px] max-w-[380px] mx-auto leading-[1.6] text-center transition-all duration-500 active:text-white/60 inactive:text-[#666]">
            The all-in-one CSS background composer.
            <br />
            Free, open source, zero dependencies.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["Gradients", "Patterns", "Noise", "Animation", "CSS Export"].map((feature) => (
              <a
                key={feature}
                href="/studio"
                className="text-[11px] font-mono px-3 py-1.5 rounded-full transition-all duration-300 no-underline active:bg-white/8 active:text-white/50 active:hover:bg-white/15 active:hover:text-white/80 inactive:bg-black/[0.03] inactive:text-[#666] inactive:hover:bg-[#4f46e5]/[0.08] inactive:hover:text-[#4f46e5]"
              >
                {feature}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8 active:bg-white/10 inactive:bg-black/[0.04]" />

        {/* Bottom: Copyright + Socials */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 text-[11px] font-mono uppercase tracking-[0.15em] transition-all duration-500 active:text-white/50 inactive:text-[#666]">
            <span>&copy; {new Date().getFullYear()} GradientCraft</span>
            <span aria-hidden="true" className="hidden sm:inline active:text-white/50 inactive:text-black/60">&middot;</span>
            <span className="font-bold active:text-white/70 inactive:text-[#4f46e5]">MIT License</span>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: <GitHubIcon size={18} />, href: "https://github.com/Nandhu125/gradient-craft", label: "GitHub" },
              { icon: <XSocialIcon size={18} />, href: "https://x.com", label: "Twitter" },
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.label}
                className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:-translate-y-0.5 active:bg-white/8 active:border-white/15 active:text-white/60 active:hover:bg-white/15 active:hover:text-white inactive:bg-transparent inactive:border-black/[0.06] inactive:text-[#666] inactive:hover:text-[#4f46e5] inactive:hover:bg-white inactive:hover:border-[#4f46e5]/20 inactive:hover:shadow-[0_4px_16px_rgba(79,70,229,0.1)]"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
