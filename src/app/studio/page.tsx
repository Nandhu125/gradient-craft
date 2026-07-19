"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { StudioState, StudioTab } from "@/types/studio";
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
import { StudioStatusBar } from "@/components/studio/studio-status-bar";
import { StudioTopBar } from "@/components/studio/studio-top-bar";

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

  return (
    <>
      <style>{ALL_KEYFRAMES}</style>
      <div
        className="h-screen flex flex-col overflow-hidden"
        style={{ fontFamily: "var(--ff-inter), 'Inter', sans-serif", background: "#0e0e0f", color: "#fff" }}
      >
        {/* Top Navbar */}
        <StudioTopBar
          state={state}
          copied={copied}
          shared={shared}
          onReset={handleReset}
          onShowSaved={() => setShowSaved(true)}
          onShowCode={() => setShowCode(true)}
          onShare={handleShare}
          onCopy={handleCopy}
        />

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
        <StudioStatusBar state={state} onReset={handleReset} />

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
