"use client";

interface CardPreviewProps {
  textMode: "light" | "dark";
}

export function CardPreview({ textMode }: CardPreviewProps) {
  const isLight = textMode === "light";

  return (
    <div className="w-full h-full flex items-center justify-center p-6 select-none pointer-events-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[620px] w-full">
        {/* Metric & Analytics Glass Card */}
        <div
          className={`p-5 rounded-2xl border backdrop-blur-xl shadow-xl transition-all duration-300 ${
            isLight
              ? "bg-black/30 border-white/20 text-white shadow-black/20"
              : "bg-white/70 border-black/10 text-slate-900 shadow-slate-900/10"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-xs font-mono uppercase tracking-wider font-semibold ${
                isLight ? "text-white/60" : "text-slate-500"
              }`}
            >
              Revenue Velocity
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              +28.4%
            </span>
          </div>

          <div className="text-3xl font-extrabold tracking-tight mb-2">
            $148,920
          </div>
          <p
            className={`text-xs mb-4 ${
              isLight ? "text-white/70" : "text-slate-600"
            }`}
          >
            Real-time conversion through active gradient pipelines.
          </p>

          {/* Mini Sparkline Chart Mock */}
          <div className="h-10 w-full flex items-end gap-1 mb-4">
            {[40, 65, 45, 80, 55, 90, 75, 100, 85, 95].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm transition-all ${
                  isLight ? "bg-white/40" : "bg-slate-900/30"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div
            className={`pt-3 border-t flex items-center justify-between text-[11px] ${
              isLight
                ? "border-white/10 text-white/60"
                : "border-black/10 text-slate-500"
            }`}
          >
            <span>Target: $160,000</span>
            <span className="font-semibold">93.1% Met</span>
          </div>
        </div>

        {/* User Activity & Settings Card */}
        <div
          className={`p-5 rounded-2xl border backdrop-blur-xl shadow-xl flex flex-col justify-between transition-all duration-300 ${
            isLight
              ? "bg-white/10 border-white/15 text-white shadow-black/20"
              : "bg-white/80 border-black/10 text-slate-900 shadow-slate-900/10"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                NK
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Sarah Jenkins</h4>
                <p
                  className={`text-xs ${
                    isLight ? "text-white/60" : "text-slate-500"
                  }`}
                >
                  Principal Design Architect
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {[
                { label: "Hardware Acceleration", status: "Active" },
                { label: "Sub-pixel Antialiasing", status: "Enabled" },
                { label: "WCAG AAA Compliance", status: "Verified" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg border ${
                    isLight
                      ? "bg-white/5 border-white/10 text-white/85"
                      : "bg-black/[0.03] border-black/5 text-slate-700"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] font-semibold text-emerald-400">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`w-full py-2 rounded-xl text-xs font-semibold text-center transition-colors border ${
              isLight
                ? "bg-white text-slate-900 border-white"
                : "bg-slate-950 text-white border-slate-950"
            }`}
          >
            Inspect Layers
          </div>
        </div>
      </div>
    </div>
  );
}
