"use client";

import type { Gradient, AnimationState } from "@/types";
import { safeStyle } from "@/lib/utils";
import { XIcon, ControlsIcon } from "@/components/ui/icons";

interface Props {
  activeGradient: Gradient;
  animState: AnimationState;
  setSpeed: (v: number) => void;
  setTiming: (v: string) => void;
  setDirection: (v: string) => void;
  setPaused: (fn: (p: boolean) => boolean) => void;
  controlsOpen: boolean;
  setControlsOpen: (fn: (o: boolean) => boolean) => void;
  onReset: () => void;
  onClose: () => void;
}

const TIMING_OPTIONS = ["ease", "linear", "ease-in", "ease-out", "ease-in-out"];
const DIRECTION_OPTIONS = ["normal", "reverse", "alternate"];

export function AnimationControls({
  activeGradient, animState, setSpeed, setTiming, setDirection, setPaused,
  controlsOpen, setControlsOpen, onReset, onClose,
}: Props) {
  const { speed, timing, direction, paused } = animState;

  return (
    <div className="fixed bottom-10 inset-x-0 mx-auto w-max z-[200] animate-[fadeUpPill_0.3s_ease_both] flex flex-col items-center">
      <div
        className={`overflow-hidden transition-all duration-350 ease-in-out ${
          controlsOpen ? "w-[340px] max-h-[400px] opacity-100 mb-2" : "w-0 max-h-0 opacity-0 mb-0"
        }`}
      >
        <div className="bg-black/65 backdrop-blur-3xl rounded-14 p-5 text-white font-outfit shadow-[0_12px_48px_rgba(0,0,0,0.3)] border border-white/8">
          <div className="flex justify-between items-center mb-[18px]">
            <span className="text-[13px] font-semibold tracking-tight">Animation Controls</span>
            <button
              onClick={onReset}
              className="bg-white/8 border border-white/10 text-white/50 text-[11px] font-mono px-[10px] py-[3px] rounded-md cursor-pointer transition-all hover:text-white hover:bg-white/12"
            >
              Reset
            </button>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] text-white/50 font-mono">Speed</span>
              <span className="text-[12px] text-white/80 font-mono font-medium">{speed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.25"
              max="3"
              step="0.25"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="ctrl-slider"
            />
          </div>

          <div className="mb-4">
            <span className="text-[12px] text-white/50 font-mono block mb-2">Timing</span>
            <div className="flex gap-1">
              {TIMING_OPTIONS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTiming(t)}
                  className={`flex-1 py-[5px] rounded-md text-[10px] font-mono cursor-pointer transition-all whitespace-nowrap ${
                    timing === t 
                      ? "border border-white/30 bg-white/15 text-white" 
                      : "border border-white/8 bg-white/4 text-white/45"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <span className="text-[12px] text-white/50 font-mono block mb-2">Direction</span>
            <div className="flex gap-1">
              {DIRECTION_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(d)}
                  className={`flex-1 py-[6px] rounded-md text-[11px] font-mono cursor-pointer transition-all capitalize ${
                    direction === d 
                      ? "border border-white/30 bg-white/15 text-white" 
                      : "border border-white/8 bg-white/4 text-white/45"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setPaused((p) => !p)}
            className={`w-full p-2 rounded-lg border border-white/10 text-white text-[12px] font-medium font-outfit cursor-pointer flex items-center justify-center gap-1.5 transition-all ${
              paused ? "bg-[#4f46e5]/30" : "bg-white/6"
            }`}
          >
            {paused ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="3" width="4" height="18" /><rect x="15" y="3" width="4" height="18" /></svg>
            )}
            {paused ? "Resume" : "Pause"} Animation
          </button>
        </div>
      </div>

      {/* Pill bar */}
      <div className="bg-black/55 backdrop-blur-2xl rounded-xl py-2.5 px-4 flex items-center gap-2.5 text-white text-[13px] font-medium font-outfit shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <div 
          className="w-5 h-5 rounded-[25%] shrink-0" 
          style={safeStyle(activeGradient.style)} 
        />
        <span>{activeGradient.name}</span>

        <div className="w-[1px] h-3.5 bg-white/15" />

        <button
          onClick={() => setControlsOpen((o) => !o)}
          className={`border-none cursor-pointer flex items-center text-[13px] font-outfit font-medium gap-1 px-1.5 py-[2px] rounded-[5px] transition-all hover:text-white ${
            controlsOpen ? "bg-white/15 text-white" : "bg-none text-white/70"
          }`}
        >
          <ControlsIcon />
          Controls
        </button>

        <div className="w-[1px] h-3.5 bg-white/15" />

        <button
          onClick={onClose}
          className="bg-none border-none text-white/70 cursor-pointer flex items-center text-[13px] font-outfit font-medium gap-1 p-0 hover:text-white"
        >
          <XIcon size={14} /> Reset
        </button>
      </div>
    </div>
  );
}
