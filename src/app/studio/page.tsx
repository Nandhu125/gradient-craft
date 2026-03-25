"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { StudioState, StudioTab } from "@/types/studio";
import { DEFAULT_STUDIO_STATE } from "@/types/studio";
import { ALL_KEYFRAMES } from "@/data/gradients";
import { generateCSS } from "@/lib/studio-css";
import { Logo } from "@/components/ui/logo";
import { PreviewPanel } from "@/components/studio/preview-panel";
import { ControlsPanel } from "@/components/studio/controls-panel";
import { CssOutput } from "@/components/studio/css-output";

export default function StudioPage() {
  const [state, setState] = useState<StudioState>(DEFAULT_STUDIO_STATE);
  const [activeTab, setActiveTab] = useState<StudioTab>("gradient");
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateLayer = useCallback(
    <K extends keyof StudioState>(layer: K, patch: Partial<StudioState[K]>) => {
      setState((prev) => ({
        ...prev,
        [layer]: { ...prev[layer], ...patch },
      }));
    },
    []
  );

  const handleReset = useCallback(() => {
    setState(DEFAULT_STUDIO_STATE);
  }, []);

  const handleCopy = useCallback(async () => {
    const css = generateCSS(state);
    try {
      await navigator.clipboard.writeText(css);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = css;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  }, [state]);

  return (
    <>
      <style>{ALL_KEYFRAMES}</style>
      <div className="h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/8 bg-[#0a0a0a]/80 backdrop-blur-xl z-50 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <Logo size={24} active />
            <span className="font-mono text-[13.5px] font-extrabold tracking-[-0.03em] text-white hidden sm:block">
              GradientCraft
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="text-white/50 hover:text-white/80 text-[12.5px] font-medium no-underline transition-colors duration-300 hidden sm:block"
            >
              Home
            </Link>
            <div className="w-px h-3.5 bg-white/10 hidden sm:block" />
            <button
              onClick={() => setShowCode(true)}
              className="px-3 py-1.5 rounded-lg text-[12.5px] font-medium bg-white/8 hover:bg-white/12 text-white/70 hover:text-white border border-white/8 transition-all duration-300 cursor-pointer"
            >
              View CSS
            </button>
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-lg text-[12.5px] font-semibold bg-white text-[#0a0a0a] hover:bg-white/90 border-none transition-all duration-300 cursor-pointer flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                  Copy CSS
                </>
              )}
            </button>
          </div>
        </nav>

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <PreviewPanel state={state} />
          <ControlsPanel
            state={state}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            updateLayer={updateLayer}
          />
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-t border-white/8 bg-[#0a0a0a]/90 backdrop-blur-xl shrink-0">
          <span className="text-[11px] text-white/30 font-mono">
            {[
              state.baseColor.enabled && "base",
              state.gradient.enabled && "gradient",
              state.pattern.enabled && "pattern",
              state.noise.enabled && "noise",
              state.animation.enabled && "anim",
            ]
              .filter(Boolean)
              .join(" + ") || "no layers"}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg text-[11.5px] font-medium text-white/40 hover:text-white/70 hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* CSS Output Modal */}
        {showCode && (
          <CssOutput
            state={state}
            onCopy={handleCopy}
            copied={copied}
            onClose={() => setShowCode(false)}
          />
        )}
      </div>
    </>
  );
}
