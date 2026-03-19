"use client";

import { useState, useEffect } from "react";
import type { Gradient } from "@/types";
import { GRADIENTS, CATEGORIES } from "@/data/gradients";
import { GradientCard } from "./gradient-card";
import { SearchIcon } from "@/components/ui/icons";

interface Props {
  hasActive: boolean;
  cat: string;
  setCat: (c: string) => void;
  q: string;
  setQ: (q: string) => void;
  copiedId: string | null;
  onCopy: (g: Gradient) => void;
  onApply: (g: Gradient) => void;
  activeId: string | undefined;
  showAll: boolean;
  setShowAll: (v: boolean) => void;
}

export function GradientCollection({
  hasActive, cat, setCat, q, setQ, copiedId, onCopy, onApply, activeId, showAll, setShowAll,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const filtered = GRADIENTS.filter((g) => {
    const mc = cat === "All" || g.category === cat;
    const ms =
      !q ||
      g.name.toLowerCase().includes(q.toLowerCase()) ||
      g.tags.some((t) => t.includes(q.toLowerCase())) ||
      g.category.toLowerCase().includes(q.toLowerCase());
    return mc && ms;
  });

  const isSearching = q || cat !== "All";
  const visible = isSearching || showAll ? filtered : filtered.slice(0, 12);

  const counts: Record<string, number> = {};
  CATEGORIES.forEach((c) => {
    counts[c] = c === "All" ? GRADIENTS.length : GRADIENTS.filter((g) => g.category === c).length;
  });

  if (!mounted) return null;

  return (
    <section
      id="collection"
      className="py-10 sm:py-20 px-3.5 sm:px-[clamp(20px,4vw,40px)] pb-[120px] max-w-[1300px] mx-auto relative z-[1]"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-12 gap-4">
        <div className="animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_both] w-full sm:w-auto">
          <div className={`font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] mb-1 sm:mb-3 ${
            hasActive ? "mix-blend-difference brightness-[2]" : "text-[#4f46e5]"
          }`}>
            Explore Textures
          </div>
          <h2 className={`text-[24px] sm:text-[clamp(32px,4vw,42px)] font-extrabold tracking-tighter leading-tight transition-colors duration-400 ${
            hasActive ? "text-white" : "text-[#111]"
          }`}>
            The Collection
          </h2>
        </div>

        <div className={`text-[12px] sm:text-[14px] font-mono sm:pb-1.5 animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.1s_both] ${
          hasActive ? "text-white/40" : "text-[#999]"
        }`}>
          Showing {visible.length} of {GRADIENTS.length} gradients
        </div>
      </div>

      <div
        className={`flex gap-3 sm:gap-4 items-center mb-8 sm:mb-10 p-2 sm:p-2.5 backdrop-blur-3xl saturate-[160%] rounded-2xl sm:rounded-20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] animate-reveal [animation-delay:0.2s] flex-col sm:flex-row ${
          hasActive ? "bg-white/8 border border-white/12" : "bg-white/60 border border-black/5"
        }`}
      >
        {/* Compact Search */}
        <div className="relative flex-1 w-full sm:max-w-[280px]">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aaa] flex pointer-events-none">
            <SearchIcon size={16} />
          </div>
          <input
            type="text"
            placeholder="Search gradients..."
            value={q}
            onChange={(e) => { setQ(e.target.value); setShowAll(false); }}
            className={`w-full py-2.5 sm:py-2.5 pr-4 pl-10 rounded-xl sm:rounded-14 border border-black/6 text-[13.5px] font-outfit outline-none transition-all duration-300 focus:border-[#4f46e5] focus:shadow-[0_0_0_4px_rgba(79,70,229,0.06)] ${
              hasActive ? "bg-white/10 text-white placeholder-white/30" : "bg-white text-[#111] placeholder-[#aaa]"
            }`}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap gap-2 w-full lg:w-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => { setCat(c); setShowAll(false); }}
              className={`px-3 py-2.5 rounded-xl cursor-pointer border border-black/4 text-[12.5px] font-semibold flex items-center justify-center gap-2 font-outfit transition-all duration-300 hover:translate-y-[-1px] ${
                cat === c 
                  ? "bg-[#111] text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] active" 
                  : `hover:bg-black/3 ${hasActive ? "bg-white/5 text-white/60 border-white/10" : "bg-transparent text-[#777]"}`
              }`}
            >
              <span className="whitespace-nowrap">{c}</span>
              <span className={`opacity-40 font-mono text-[10px] px-1.5 py-0.5 rounded-md ${
                cat === c ? "bg-white/20" : "bg-black/5"
              }`}>
                {counts[c]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-1 sm:px-0">
        {visible.map((g, i) => (
          <div 
            key={g.id} 
            className="animate-[gridReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <GradientCard
              gradient={g}
              onCopy={onCopy}
              copiedId={copiedId}
              onApply={onApply}
              activeId={activeId}
              delay={0}
            />
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-[120px] px-5 animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
            <div className="w-16 h-16 rounded-20 bg-black/3 inline-flex items-center justify-center mb-6 text-[#ccc]">
              <SearchIcon size={32} />
            </div>
            <h3 className={`text-[20px] font-bold mb-2 ${hasActive ? "text-white" : "text-[#111]"}`}>
              No gradients found
            </h3>
            <p className="text-[15px] text-[#888] max-w-[300px] mx-auto">
              We couldn&apos;t find anything matching &quot;{q}&quot;. Try a different keyword or category.
            </p>
          </div>
        )}
      </div>

      {!isSearching && !showAll && filtered.length > 12 && (
        <div className="text-center mt-16 animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
          <button
            onClick={() => setShowAll(true)}
            className={`px-10 py-4 rounded-[100px] border backdrop-blur-md text-[15px] font-semibold cursor-pointer font-outfit transition-all duration-400 cubic-bezier(0.16,1,0.3,1) shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:translate-y-[-4px] hover:scale-[1.02] hover:bg-[#111] hover:text-white hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] ${
              hasActive 
                ? "border-white/20 bg-white/10 text-white" 
                : "border-black/10 bg-white text-[#111]"
            }`}
          >
            Show All Gradients ({GRADIENTS.length})
          </button>
        </div>
      )}
    </section>
  );
}
