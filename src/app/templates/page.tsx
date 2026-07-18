"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { TEMPLATES, type Template } from "@/data/templates";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
  { label: "Mesh", value: "mesh" },
  { label: "Grid", value: "grid" },
  { label: "Pattern", value: "pattern" },
];

function TemplateCard({
  template,
  onCopy,
}: {
  template: Template;
  onCopy: (name: string) => void;
}) {
  const [copyState, setCopyState] = useState(false);

  const handleCopy = useCallback(async () => {
    const css = `/* ${template.name} — Made with GradientCraft */\n${template.css}`;
    try {
      await navigator.clipboard.writeText(css);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = css;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopyState(true);
    onCopy(template.name);
    setTimeout(() => setCopyState(false), 2000);
  }, [template.css, template.name, onCopy]);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-black/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)] hover:border-black/[0.12]">
      <div className="h-[240px] relative overflow-hidden" style={template.previewStyle} />
      <div className="p-4 px-[18px]">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[15px] font-semibold text-[#1a1a1a]">{template.name}</span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.05em] text-[#666] bg-[#f4f4f2] px-2.5 py-[3px] rounded-full">
            {template.category}
          </span>
        </div>
        <div className="flex gap-[5px] flex-wrap mb-3">
          {template.layers.map((l) => (
            <span
              key={l}
              className="font-mono text-[10px] text-[#666] bg-[#f8f8f6] px-2 py-[3px] rounded-md border border-black/[0.04]"
            >
              {l}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {template.studioState ? (
            <Link
              href={`/studio?template=${template.id}`}
              className="flex-1 py-[9px] rounded-[10px] bg-[#1a1a1a] text-white text-xs font-semibold no-underline flex items-center justify-center gap-1.5 hover:opacity-85 transition-opacity"
            >
              Edit in Studio
              <svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={5} y1={12} x2={19} y2={12} />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/studio"
              className="flex-1 py-[9px] rounded-[10px] bg-[#1a1a1a] text-white text-xs font-semibold no-underline flex items-center justify-center gap-1.5 hover:opacity-85 transition-opacity"
            >
              Open Studio
              <svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={5} y1={12} x2={19} y2={12} />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          )}
          <button
            onClick={handleCopy}
            className={`py-[9px] px-3.5 rounded-[10px] border font-mono text-xs font-medium flex items-center gap-[5px] cursor-pointer transition-all duration-200 ${
              copyState
                ? "bg-[rgba(22,163,74,0.06)] text-[#16a34a] border-[rgba(22,163,74,0.2)]"
                : "bg-[#fafaf8] text-[#666] border-black/[0.08] hover:bg-[#f0f0ee] hover:text-[#1a1a1a]"
            }`}
          >
            {copyState ? (
              <>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Copied
              </>
            ) : (
              <>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={9} y={9} width={13} height={13} rx={2} /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered = TEMPLATES.filter(
    (t) => activeFilter === "all" || t.tags.includes(activeFilter)
  );

  const handleCopy = useCallback((name: string) => {
    setToast(`${name} CSS copied to clipboard`);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  return (
    <div className="min-h-screen font-outfit" style={{ background: "#fafaf8", color: "#1a1a1a" }}>
      <Navbar hasActive={false} scrolled={scrolled} onRandom={() => router.push("/")} />

      <main className="max-w-[1280px] mx-auto px-8 py-12">
        {/* Header */}
        <header className="text-center mb-14">
          <h1 className="text-[clamp(32px,4vw,44px)] font-bold tracking-[-0.03em] text-[#111] mb-2.5">
            Template Library
          </h1>
          <p className="text-base text-[#666] max-w-[560px] mx-auto leading-relaxed">
            Start from a beautiful premade background. Click Edit to customize every layer in the Studio, or copy the CSS instantly.
          </p>
        </header>

        {/* Filters */}
        <div className="flex justify-center gap-1.5 flex-wrap mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-[7px] rounded-full border text-[13px] font-medium cursor-pointer transition-all duration-200 ${
                activeFilter === f.value
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : "bg-white text-[#666] border-black/[0.08] hover:border-indigo-400/60 hover:text-indigo-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6">
          {filtered.map((t) => (
            <TemplateCard key={t.id} template={t} onCopy={handleCopy} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20 text-[#666]">
              <p className="text-[17px] mb-1.5">No templates found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center pt-12 pb-6 text-[#666] text-[13px]">
          Built with{" "}
          <Link href="/studio" className="text-indigo-700 no-underline font-medium hover:underline">
            GradientCraft Studio
          </Link>
          {" "}· Each template is fully editable
        </div>
      </main>

      {/* Toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white py-3 px-5 rounded-xl text-[13px] font-medium flex items-center gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.2)] z-[1000] transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        {toast}
      </div>
    </div>
  );
}
