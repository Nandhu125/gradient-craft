export interface BaseColorLayer {
  enabled: boolean;
  color: string;
}

export interface GradientStop {
  color: string;
  position: number;
}

export interface GradientLayer {
  enabled: boolean;
  type: "linear" | "radial" | "conic";
  angle: number;
  stops: GradientStop[];
  presetId: string | null;
}

export type PatternType =
  | "dots"
  | "grid"
  | "lines"
  | "diagonal"
  | "checkerboard"
  | "crosses";

export interface PatternLayer {
  enabled: boolean;
  type: PatternType;
  size: number;
  color: string;
  opacity: number;
}

export interface NoiseLayer {
  enabled: boolean;
  intensity: number;
  opacity: number;
}

export interface AnimationLayer {
  enabled: boolean;
  speed: number;
  direction: "normal" | "reverse" | "alternate";
  presetId: string | null;
}

export interface StudioState {
  baseColor: BaseColorLayer;
  gradient: GradientLayer;
  pattern: PatternLayer;
  noise: NoiseLayer;
  animation: AnimationLayer;
}

export type StudioTab = "base" | "gradient" | "pattern" | "noise" | "animation";

export const DEFAULT_STUDIO_STATE: StudioState = {
  baseColor: {
    enabled: true,
    color: "#0a0a0a",
  },
  gradient: {
    enabled: true,
    type: "linear",
    angle: 135,
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 100 },
    ],
    presetId: null,
  },
  pattern: {
    enabled: false,
    type: "dots",
    size: 20,
    color: "#ffffff",
    opacity: 0.1,
  },
  noise: {
    enabled: false,
    intensity: 0.65,
    opacity: 0.15,
  },
  animation: {
    enabled: false,
    speed: 1,
    direction: "normal",
    presetId: null,
  },
};
