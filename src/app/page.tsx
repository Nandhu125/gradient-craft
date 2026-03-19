"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Gradient, AnimationState } from "@/types";
import { GRADIENTS, ALL_KEYFRAMES } from "@/data/gradients";
import { GradientBackground } from "@/components/gradients/gradient-background";
import { GradientCollection } from "@/components/gradients/gradient-collection";
import { AnimationControls } from "@/components/gradients/animation-controls";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { UseCases } from "@/components/home/use-cases";
import { About } from "@/components/home/about";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
// import { SupportPopup } from "@/components/ui/support-popup";
// import { HeartIcon } from "@/components/ui/icons";

export default function Home() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeGradient, setActiveGradient] = useState<Gradient | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [animState, setAnimState] = useState<AnimationState>({
    speed: 1,
    direction: "normal",
    timing: "ease",
    paused: false,
  });

  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasActive = !!activeGradient;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = useCallback(async (g: Gradient) => {
    const code = `${g.css}\n\n${g.keyframes}`;
    const onSuccess = () => {
      setCopiedId(g.id);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopiedId(null), 2000);
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        onSuccess();
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          onSuccess();
        } catch (error) {
          console.error("Fallback copy failed:", error);
        } finally {
          textArea.remove();
        }
      }
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  }, []);

  const handleApply = useCallback((g: Gradient) => {
    setActiveGradient((prev) => (prev?.id === g.id ? null : g));
  }, []);

  const handleRandom = useCallback(() => {
    const available = GRADIENTS.filter((g) => g.id !== activeGradient?.id);
    const pick = available[Math.floor(Math.random() * available.length)];
    setActiveGradient(pick ?? null);
  }, [activeGradient]);

  const scrollToCollection = () =>
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });

  const handleResetControls = () =>
    setAnimState({ speed: 1, direction: "normal", timing: "ease", paused: false });

  return (
    <>
      <style>{ALL_KEYFRAMES}</style>

      <div className={`min-h-screen ${hasActive ? "bg-transparent" : "bg-[#fafaf8]"} text-[#1a1a1a] font-outfit`}>
        <GradientBackground activeGradient={activeGradient} animState={animState} />

        <Navbar hasActive={hasActive} scrolled={scrolled} onRandom={handleRandom} />

        <main>
          <Hero hasActive={hasActive} onScrollToCollection={scrollToCollection} onCopy={handleCopy} copiedId={copiedId} onApply={handleApply} />

          <HowItWorks hasActive={hasActive} onScrollToCollection={scrollToCollection} />

          <GradientCollection
            hasActive={hasActive}
            cat={cat}
            setCat={setCat}
            q={q}
            setQ={setQ}
            copiedId={copiedId}
            onCopy={handleCopy}
            onApply={handleApply}
            activeId={activeGradient?.id}
            showAll={showAll}
            setShowAll={setShowAll}
          />

          <UseCases hasActive={hasActive} />

          <About hasActive={hasActive} />
        </main>

        <Footer hasActive={hasActive} />

        <ScrollToTop hasActive={hasActive} />

        {/*
        <button
          onClick={() => setSupportOpen(true)}
          title="Support the Project"
          className={`fixed bottom-6 left-6 w-12 h-12 rounded-full grid place-items-center z-[100] transition-all duration-500 ease-premium shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)] border group hover:scale-110 active:scale-95 ${
            hasActive 
              ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
              : "bg-white/90 border-black/[0.06] text-[#ff4b4b] hover:bg-white hover:border-[#ff4b4b]/20 hover:shadow-[0_12px_32px_-8px_rgba(255,75,75,0.2)]"
          }`}
        >
          <HeartIcon size={20} className="transition-transform duration-500 group-hover:scale-110 group-hover:fill-current" />
        </button>

        <SupportPopup 
          isOpen={supportOpen} 
          onClose={() => setSupportOpen(false)} 
          hasActive={hasActive} 
        />
        */}

        {activeGradient && (
          <AnimationControls
            activeGradient={activeGradient}
            animState={animState}
            setSpeed={(s) => setAnimState(p => ({ ...p, speed: s }))}
            setTiming={(t) => setAnimState(p => ({ ...p, timing: t }))}
            setDirection={(d) => setAnimState(p => ({ ...p, direction: d }))}
            setPaused={(fn) => setAnimState(p => ({ ...p, paused: fn(p.paused) }))}
            controlsOpen={controlsOpen}
            setControlsOpen={(fn) => setControlsOpen(fn)}
            onReset={handleResetControls}
            onClose={() => setActiveGradient(null)}
          />
        )}
      </div>
    </>
  );
}
