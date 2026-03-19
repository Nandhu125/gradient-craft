"use client";

import { useState, useEffect } from "react";
import { ArrowUpIcon } from "@/components/ui/icons";

interface Props {
  hasActive: boolean;
}

export function ScrollToTop({ hasActive }: Props) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > 400);
      setProgress(docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0);
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // SVG circle math: r=20, circumference = 2*pi*20 ≈ 125.66
  const circumference = 125.66;
  const strokeOffset = circumference * (1 - progress);

  return (
    <button
      onClick={scrollToTop}
      title="Scroll to Top"
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] cursor-pointer border-none bg-transparent p-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
      <div className="relative w-12 h-12 sm:w-[52px] sm:h-[52px]">
        {/* Progress ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 44 44"
        >
          {/* Track */}
          <circle
            cx="22"
            cy="22"
            r="20"
            fill="none"
            className={`transition-all duration-300 ${
              hasActive ? "stroke-white/10" : "stroke-black/[0.06]"
            }`}
            strokeWidth="2"
          />
          {/* Progress */}
          <circle
            cx="22"
            cy="22"
            r="20"
            fill="none"
            stroke="url(#progressGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            className="transition-[stroke-dashoffset] duration-150"
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center button */}
        <div
          className={`absolute inset-[4px] rounded-full grid place-items-center backdrop-blur-[12px] backdrop-saturate-[180%] transition-all duration-300 group-hover:scale-110 group-active:scale-95 ${
            hasActive
              ? "bg-white/10 text-white group-hover:bg-white/20"
              : "bg-white/90 text-[#666] shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:text-[#4f46e5] group-hover:shadow-[0_4px_16px_rgba(79,70,229,0.15)]"
          }`}
        >
          <ArrowUpIcon size={16} />
        </div>
      </div>

      {/* Percentage tooltip on hover */}
      <div
        className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
          hasActive
            ? "bg-white/15 text-white/80"
            : "bg-[#111] text-white"
        }`}
      >
        {Math.round(progress * 100)}%
      </div>
    </button>
  );
}
