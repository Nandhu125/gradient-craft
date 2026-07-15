"use client";

import { useState, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { StudioState, StudioTab } from "@/types/studio";
import { Logo } from "@/components/ui/logo";
import { RefreshIcon, CodeIcon, CheckIcon, CopyIcon, ShareIcon } from "@/components/ui/icons";
import { DEFAULT_STUDIO_STATE } from "@/types/studio";
import { ALL_KEYFRAMES } from "@/data/gradients";
import { TEMPLATES } from "@/data/templates";
import { generateCSS } from "@/lib/studio-css";
import { encodeState, decodeState } from "@/lib/studio-share";
import { PreviewPanel } from "@/components/studio/preview-panel";
import { ControlsPanel } from "@/components/studio/controls-panel";
import { CssOutput } from "@/components/studio/css-output";

function StudioInner() {
  const searchParams = useSearchParams();
  const getInitialState = (): StudioState => {
    // A shared `?s=` token takes precedence over a `?template=` id.
    const shared = searchParams.get("s");
    if (shared) {
      const decoded = decodeState(shared);
      if (decoded) return decoded;
    }
    const id = searchParams.get("template");
    if (id) {
      const tpl = TEMPLATES.find((t) => t.id === id);
      if (tpl?.studioState) return tpl.studioState;
    }
    return DEFAULT_STUDIO_STATE;
  };
  const [state, setState] = useState<StudioState>(getInitialState);
  const [expandedSections, setExpandedSections] = useState<StudioTab[]>(["gradient"]);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}?s=${encodeState(state)}`;
    // Reflect the shareable state in the address bar so a refresh keeps it.
    window.history.replaceState(null, "", url);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setShared(true);
    if (shareTimer.current) clearTimeout(shareTimer.current);
    shareTimer.current = setTimeout(() => setShared(false), 2000);
  }, [state]);

  const toggleSection = useCallback((tab: StudioTab) => {
    setExpandedSections((prev) =>
      prev.includes(tab) ? prev.filter((t) => t !== tab) : [...prev, tab]
    );
  }, []);

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
              onClick={() => setShowCode(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-medium bg-[#201f21] hover:bg-[#2a292b] text-[#ccc] hover:text-white border border-[#484849]/40 transition-all duration-200 cursor-pointer"
            >
              <CodeIcon size={16} />
              View CSS
            </button>
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
        <div className="flex-1 flex overflow-hidden">
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
        </div>

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

export default function StudioPage() {
  return (
    <Suspense>
      <StudioInner />
    </Suspense>
  );
}
