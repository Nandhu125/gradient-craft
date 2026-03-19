import type { CSSProperties } from "react";

export interface GradientStyle {
  background: string;
  backgroundSize: string;
  animation: string;
}

export interface Gradient {
  id: string;
  name: string;
  category: string;
  tags: string[];
  css: string;
  keyframes: string;
  style: GradientStyle;
}

export interface AnimationState {
  speed: number;
  direction: string;
  timing: string;
  paused: boolean;
}

export type SafeStyle = Omit<CSSProperties, "background" | "animation"> & {
  backgroundImage?: string;
  animationName?: string;
  animationDuration?: string;
  animationTimingFunction?: string;
  animationIterationCount?: string;
  animationDirection?: string;
};
