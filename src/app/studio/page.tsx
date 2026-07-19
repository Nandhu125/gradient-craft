"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { StudioState, StudioTab } from "@/types/studio";
import { Logo } from "@/components/ui/logo";
import { RefreshIcon, CodeIcon, CheckIcon, CopyIcon, ShareIcon, BookmarkIcon } from "@/components/ui/icons";
import { DEFAULT_STUDIO_STATE } from "@/types/studio";
import { ALL_KEYFRAMES } from "@/data/gradients";
import { generateCSS } from "@/lib/studio-css";
import { copyToClipboard } from "@/lib/utils";
import { useTimedFlag } from "@/lib/use-timed-flag";
import { useAccordion } from "@/lib/use-accordion";
import { encodeState, resolveInitialState } from "@/lib/studio-share";
import { PreviewPanel } from "@/components/studio/preview-panel";
import { ControlsPanel } from "@/components/studio/controls-panel";
import { CssOutput } from "@/components/studio/css-output";
import { SavedPanel } from "@/components/studio/saved-panel";
import { ExportMenu } from "@/components/studio/export-menu";

function StudioInner() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<StudioState>(() =>
    resolveInitialState(searchParams)
  );
  const [expandedSections, toggleSection] = useAccordion<StudioTab>(["gradient"]);
  const [copied, flagCopied] = useTimedFlag();
  const [shared, flagShared] = useTimedFlag();
  const [showCode, setShowCode] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

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
    await copyToClipboard(generateCSS(state));
    flagCopied();
  }, [state, flagCopied]);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}?s=${encodeState(state)}`;
    // Reflect the shareable state in the address bar so a refresh keeps it.
    window.history.replaceState(null, "", url);
    await copyToClipboard(url);
    flagShared();
  }, [state, flagShared]);

  const activeLayers = [
    state.baseColor.enabled && "Base",
    state.gradient.enabled && "Gradient",
    state.pattern.enabled && "Pattern",
    state.noise.enabled && "Noise",
    state.animation.enabled && "Anim",
  ].filter(Boolean);

  return (
    <>
      <style>{ALL_KEYFRAMES}</style>
      <div
        className="h-screen flex flex-col overflow-hidden"
        style={{ fontFamily: "var(--ff-inter), 'Inter', sans-serif", background: "#0e0e0f", color: "#fff" }}
      >
        {/* Top Navbar */}
        <nav className="flex items-center justify-between px-5 py-3 border-b border-[#484849]/40 bg-[#0e0e0f]/80 backdrop-blur-xl z-50 shrink-0">
          <div className="flex items-center gap-6">
            <Link href="/" aria-label="GradientCraft home" className="flex items-center gap-2.5 no-underline">
              <Logo size={26} active />
              <span className="font-mono text-[14.5px] font-extrabold tracking-[-0.03em] text-white hidden sm:block">
                GradientCraft
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/"
                className="text-[13px] font-medium text-[#ccc] hover:text-white no-underline transition-colors"
              >
                Home
              </Link>
              <Link
                href="/templates"
                className="text-[13px] font-medium text-[#ccc] hover:text-white no-underline transition-colors"
              >
                Templates
              </Link>
              <span className="text-[13px] font-medium text-white">Studio</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleReset}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12.5px] font-medium bg-transparent hover:bg-[#201f21] text-[#999] hover:text-[#ccc] border border-[#484849]/30 transition-all duration-200 cursor-pointer"
            >
              <RefreshIcon size={16} />
              Reset
            </button>
            <button
              onClick={() => setShowSaved(true)}
              aria-label="Saved compositions"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12.5px] font-medium bg-transparent hover:bg-[#201f21] text-[#999] hover:text-[#ccc] border border-[#484849]/30 transition-all duration-200 cursor-pointer"
            >
              <BookmarkIcon size={16} />
              <span className="hidden sm:inline">Saved</span>
            </button>
            <button
              onClick={() => setShowCode(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-medium bg-[#201f21] hover:bg-[#2a292b] text-[#ccc] hover:text-white border border-[#484849]/40 transition-all duration-200 cursor-pointer"
            >
              <CodeIcon size={16} />
              View CSS
            </button>
            <ExportMenu state={state} />
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-medium bg-[#201f21] hover:bg-[#2a292b] text-[#ccc] hover:text-white border border-[#484849]/40 transition-all duration-200 cursor-pointer"
            >
              {shared ? (
                <>
                  <CheckIcon size={16} />
                  Link copied!
                </>
              ) : (
                <>
                  <ShareIcon size={16} />
                  Share
                </>
              )}
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-semibold border-none transition-all duration-200 cursor-pointer"
              style={{
                background: "#cc97ff",
                color: "#0e0e0f",
                boxShadow: "0 0 20px rgba(204, 151, 255, 0.3)",
              }}
            >
              {copied ? (
                <>
                  <CheckIcon size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon size={16} />
                  Copy CSS
                </>
              )}
            </button>
          </div>
        </nav>

        {/* Main Area — Preview + Single Right Sidebar */}
        <main className="flex-1 flex overflow-hidden">
          {/* Preview Canvas */}
          <div className="flex-1 relative overflow-hidden">
            <PreviewPanel state={state} />
          </div>

          {/* Right Sidebar — Accordion Layers */}
          <ControlsPanel
            state={state}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            updateLayer={updateLayer}
          />
        </main>

        {/* Bottom HUD */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-[#484849]/40 bg-[#131314]/90 backdrop-blur-xl shrink-0">
          <span className="text-[11px] text-[#999] font-mono">
            {activeLayers.length > 0 ? activeLayers.join(" + ") : "No layers active"}
          </span>
          <div className="flex items-center gap-3">
            {state.gradient.enabled && (
              <div className="flex items-center gap-1">
                {state.gradient.stops.slice(0, 4).map((stop, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 rounded-full border border-[#484849]"
                    style={{ background: stop.color }}
                  />
                ))}
              </div>
            )}
            <button
              onClick={handleReset}
              className="sm:hidden px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#999] hover:text-[#ccc] hover:bg-[#201f21] border border-[#484849]/30 transition-all duration-200 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* CSS Output Modal */}
        {showCode && (
          <CssOutput state={state} onClose={() => setShowCode(false)} />
        )}

        {showSaved && (
          <SavedPanel
            currentState={state}
            onLoad={setState}
            onClose={() => setShowSaved(false)}
          />
        )}

        {/* Announce clipboard actions to screen readers — the button-label
            swap alone isn't reliably read out. */}
        <div className="sr-only" role="status" aria-live="polite">
          {copied
            ? "CSS copied to clipboard"
            : shared
              ? "Share link copied to clipboard"
              : ""}
        </div>
      </div>
    </>
  );
}

export default function StudioPage() {
  return (
    <Suspense>
      <StudioInner />
    </Suspense>
  );
}
