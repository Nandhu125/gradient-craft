"use client";

import { useState, useEffect, useCallback } from "react";
import type { Gradient, AnimationState } from "@/types";
import { GRADIENTS, ALL_KEYFRAMES } from "@/data/gradients";
import { GradientBackground } from "@/components/gradients/gradient-background";
import { AnimationControls } from "@/components/gradients/animation-controls";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { UseCases } from "@/components/home/use-cases";
import { About } from "@/components/home/about";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeGradient, setActiveGradient] = useState<Gradient | null>(null);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [animState, setAnimState] = useState<AnimationState>({
    speed: 1,
    direction: "normal",
    timing: "ease",
    paused: false,
  });

  const hasActive = !!activeGradient;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRandom = useCallback(() => {
    const available = GRADIENTS.filter((g) => g.id !== activeGradient?.id);
    const pick = available[Math.floor(Math.random() * available.length)];
    setActiveGradient(pick ?? null);
  }, [activeGradient]);

  const handleResetControls = () =>
    setAnimState({ speed: 1, direction: "normal", timing: "ease", paused: false });

  return (
    <>
      <style>{ALL_KEYFRAMES}</style>

      <div className={`min-h-screen ${hasActive ? "bg-transparent" : "bg-[#fafaf8]"} text-[#1a1a1a] font-outfit`}>
        <GradientBackground activeGradient={activeGradient} animState={animState} />

        <Navbar hasActive={hasActive} scrolled={scrolled} onRandom={handleRandom} />

        <main>
          <Hero hasActive={hasActive} />

          <HowItWorks hasActive={hasActive} />

          <section id="features">
            <UseCases hasActive={hasActive} />
          </section>

          <About hasActive={hasActive} />
        </main>

        <Footer hasActive={hasActive} />

        <ScrollToTop hasActive={hasActive} />

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
