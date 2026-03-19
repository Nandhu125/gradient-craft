"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { GitHubIcon, SurpriseIcon, MenuIcon, XIcon } from "@/components/ui/icons";

interface Props {
  hasActive: boolean;
  scrolled: boolean;
  onRandom: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Collection", href: "#collection" },
  { label: "About", href: "#about" },
];

export function Navbar({ hasActive, scrolled, onRandom }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (hoveredIdx !== null && linksRef.current[hoveredIdx]) {
      const link = linksRef.current[hoveredIdx];
      if (link) {
        setIndicatorStyle({
          left: link.offsetLeft,
          width: link.offsetWidth,
          opacity: 1,
        });
      }
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredIdx]);

  return (
    <div
      className={`sticky top-0 z-[100] w-full flex justify-center transition-[padding] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
        scrolled ? "py-5" : "py-7"
      }`}
    >
      <nav
        ref={navRef}
        className={`flex items-center gap-4 md:gap-8 py-2 pr-3 pl-4 rounded-full backdrop-blur-[24px] backdrop-saturate-[160%] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto max-w-[calc(100%-40px)] relative animate-[navEntry_0.8s_cubic-bezier(0.16,1,0.3,1)_both] border ${
          hasActive
            ? "bg-white/12 border-white/15"
            : scrolled
              ? "bg-white/75 border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.02)]"
              : "bg-white/40 border-black/[0.06] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 no-underline mr-1">
          <Logo size={26} active={hasActive} />
          <span
            className={`font-mono text-[14.5px] font-extrabold tracking-[-0.03em] transition-colors duration-400 ease-in-out hidden sm:block ${
              hasActive ? "text-white" : "text-[#111]"
            }`}
          >
            GradientCraft
          </span>
        </Link>

        <div className="hidden md:flex items-center relative">
          <div
            className={`absolute h-[34px] rounded-full transition-all duration-350 ease-[cubic-bezier(0.23,1,0.32,1)] top-1/2 -translate-y-1/2 z-0 pointer-events-none ${
              hasActive ? "bg-white/15" : "bg-black/[0.04]"
            }`}
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.opacity,
            }}
          />

          {NAV_LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              ref={(el) => {
                linksRef.current[i] = el;
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative z-[1] px-4 py-2 text-[13.5px] font-medium no-underline transition-colors duration-300 ease-in-out whitespace-nowrap ${
                hasActive
                  ? hoveredIdx === i
                    ? "text-white"
                    : "text-white/65"
                  : hoveredIdx === i
                    ? "text-black"
                    : "text-[#666]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 border-none cursor-pointer ${
            hasActive
              ? "text-white hover:bg-white/10"
              : "text-[#111] hover:bg-black/[0.04]"
          }`}
        >
          {menuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>

        <div className="flex items-center gap-2">
          <div className={`hidden md:block w-px h-4 mx-1 ${hasActive ? "bg-white/15" : "bg-black/[0.08]"}`} />

          <a
            href="https://github.com/Nandhu125/gradient-craft"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-[34px] h-[34px] flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
              hasActive
                ? "text-white/80 hover:bg-white/10 hover:text-white"
                : "text-[#666] hover:bg-black/[0.04] hover:text-black"
            }`}
          >
            <GitHubIcon size={17} />
          </a>

          <button
            onClick={onRandom}
            className={`px-3 sm:px-4 py-[7px] rounded-full text-[13px] font-semibold cursor-pointer border-none flex items-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-[1.03] hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] ${
              hasActive ? "bg-white text-[#111]" : "bg-[#111] text-white"
            }`}
          >
            <SurpriseIcon size={14} />
            <span className="hidden sm:inline whitespace-nowrap">Surprise</span>
          </button>
        </div>

        {menuOpen && (
          <div
            className={`absolute top-full left-0 right-0 mt-3 p-2 backdrop-blur-3xl rounded-2xl shadow-xl animate-reveal md:hidden flex flex-col gap-1 overflow-hidden pointer-events-auto border ${
              hasActive
                ? "bg-white/50 border-white/20 text-white"
                : "bg-white border-black/5 text-[#111]"
            }`}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-[14px] font-medium no-underline transition-colors ${
                  hasActive
                    ? "hover:bg-white/10 text-white/90 hover:text-white"
                    : "hover:bg-black/5 text-[#444] hover:text-[#111]"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
