"use client";

interface HeroPreviewProps {
  textMode: "light" | "dark";
}

export function HeroPreview({ textMode }: HeroPreviewProps) {
  const isLight = textMode === "light";

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-[840px] mx-auto select-none pointer-events-none">
      {/* Mock Header Nav */}
      <div
        className={`w-full flex items-center justify-between px-5 py-2.5 rounded-full border backdrop-blur-md transition-colors duration-300 ${
          isLight
            ? "bg-black/20 border-white/15 text-white"
            : "bg-white/40 border-black/10 text-slate-900 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
            ▲
          </div>
          <span className="text-xs font-bold font-mono tracking-tight">ApexUI</span>
        </div>

        <div className="hidden sm:flex items-center gap-5 text-xs font-medium opacity-80">
          <span>Products</span>
          <span>Features</span>
          <span>Customers</span>
          <span>Changelog</span>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${
            isLight
              ? "bg-white text-black border-white"
              : "bg-slate-900 text-white border-slate-900"
          }`}
        >
          Sign Up
        </div>
      </div>

      {/* Hero Content */}
      <div className="my-auto py-8 text-center flex flex-col items-center">
        {/* Release Pill */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium border mb-5 backdrop-blur-md transition-colors duration-300 ${
            isLight
              ? "bg-white/10 border-white/20 text-white/90"
              : "bg-black/5 border-black/10 text-slate-800"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>v2.4 Live · Zero CSS runtime overhead</span>
          <span className="opacity-50">→</span>
        </div>

        {/* Main Headline */}
        <h1
          className={`text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] max-w-[640px] mb-4 transition-colors duration-300 ${
            isLight ? "text-white drop-shadow-sm" : "text-slate-950"
          }`}
        >
          Ship interfaces with{" "}
          <span
            className={
              isLight
                ? "bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            }
          >
            unforgettable
          </span>{" "}
          depth.
        </h1>

        {/* Subtitle */}
        <p
          className={`text-xs sm:text-base leading-relaxed max-w-[500px] mb-6 transition-colors duration-300 ${
            isLight ? "text-white/75" : "text-slate-700"
          }`}
        >
          Engineered for zero layout shift, seamless font contrast, and fluid 60FPS animations tested across all viewports.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <div
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md transition-all ${
              isLight
                ? "bg-white text-slate-900 shadow-white/10"
                : "bg-slate-900 text-white shadow-slate-900/20"
            }`}
          >
            Start Building Free
          </div>
          <div
            className={`px-4 py-2.5 rounded-xl text-xs font-medium border backdrop-blur-md transition-colors ${
              isLight
                ? "bg-white/10 border-white/20 text-white"
                : "bg-black/5 border-black/15 text-slate-800"
            }`}
          >
            Live Demo
          </div>
        </div>
      </div>

      {/* Social Proof Footer */}
      <div
        className={`w-full flex items-center justify-center gap-3 text-[11px] transition-colors duration-300 ${
          isLight ? "text-white/70" : "text-slate-600"
        }`}
      >
        <div className="flex -space-x-1.5">
          {["#38bdf8", "#818cf8", "#c084fc", "#f472b6"].map((bg, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border border-black/20"
              style={{ backgroundColor: bg }}
            />
          ))}
        </div>
        <span>Joined by 12,000+ engineers at Stripe, Linear, and Vercel</span>
      </div>
    </div>
  );
}
