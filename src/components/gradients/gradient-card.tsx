"use client";

import { useState } from "react";
import type { Gradient } from "@/types";
import { safeStyle } from "@/lib/utils";
import { CopyIcon, CheckIcon } from "@/components/ui/icons";

interface Props {
  gradient: Gradient;
  onCopy: (g: Gradient) => void;
  copiedId: string | null;
  onApply: (g: Gradient) => void;
  activeId: string | undefined;
  delay: number;
}

export function GradientCard({ gradient, onCopy, copiedId, onApply, activeId }: Props) {
  const [hov, setHov] = useState(false);
  const isActive = activeId === gradient.id;
  const hasActive = !!activeId;
  const copied = copiedId === gradient.id;

  return (
    <div
      className={`rounded-[24px] overflow-hidden backdrop-blur-[24px] backdrop-saturate-[160%] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer relative border transform ${
        hov
          ? "-translate-y-2 scale-[1.02] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15),0_18px_36px_-18px_rgba(0,0,0,0.1)]"
          : isActive
            ? "translate-y-0 scale-100 shadow-[0_0_0_4px_rgba(79,70,229,0.1),0_10px_30px_-10px_rgba(79,70,229,0.2)]"
            : "translate-y-0 scale-100 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_-1px_rgba(0,0,0,0.01)]"
      } ${hasActive ? "bg-white/5" : "bg-white/80"} ${
        isActive ? "border-[#4f46e5]" : hasActive ? "border-white/12" : "border-black/[0.05]"
      }`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onApply(gradient)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2)_0%,transparent_60%)] pointer-events-none z-[1]" />

      <div className="relative h-[260px] overflow-hidden">
        <div
          className={`w-full h-full transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
            hov ? "scale-110" : "scale-100"
          }`}
          style={safeStyle(gradient.style)}
        />

        <div className="absolute top-4 left-4 flex gap-2 z-[2]">
          {isActive && (
            <div className="bg-[#4f46e5] text-white text-[10px] font-extrabold tracking-[0.1em] uppercase font-mono px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(79,70,229,0.3)] flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-white animate-[pulse_2s_infinite]" />
              Active
            </div>
          )}
          <div className="bg-black/30 backdrop-blur-[8px] text-white text-[10px] font-bold tracking-[0.05em] uppercase font-mono px-3 py-1.5 rounded-full border border-white/10">
            {gradient.category}
          </div>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center bg-[linear-gradient(to_top,rgba(0,0,0,0.4),transparent)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-[3] ${
            hov ? "opacity-100" : "opacity-100 lg:opacity-0"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(gradient);
            }}
            className={`px-6 py-3 rounded-full border-none cursor-pointer flex items-center gap-2.5 text-[14px] font-bold font-sans shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out hover:scale-[1.05] hover:bg-white hover:text-black ${
              copied ? "bg-[#16a34a] text-white" : "bg-white/90 backdrop-blur-[12px] text-[#111]"
            }`}
          >
            {copied ? (
              <>
                <CheckIcon size={16} /> Copied
              </>
            ) : (
              <>
                <CopyIcon size={16} /> Copy CSS
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-[20px_24px] bg-transparent relative z-[2]">
        <div className="flex justify-between items-center">
          <div>
            <h4
              className={`font-sans text-[16px] font-bold tracking-[-0.02em] transition-colors duration-400 ease-in-out ${
                hasActive ? "text-white" : "text-[#111]"
              }`}
            >
              {gradient.name}
            </h4>
            <div className="flex gap-1 mt-1">
              {gradient.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className={`text-[11px] font-mono ${hasActive ? "text-white/40" : "text-[#999]"}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
