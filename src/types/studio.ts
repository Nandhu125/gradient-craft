export interface BaseColorLayer {
  enabled: boolean;
  color: string;
}

export interface GradientStop {
  color: string;
  position: number;
}

export interface MeshPoint {
  color: string;
  x: number;
  y: number;
}

export interface GradientLayer {
  enabled: boolean;
  type: "linear" | "radial" | "conic" | "mesh";
  angle: number;
  stops: GradientStop[];
  // Only used when type === "mesh". Optional so existing StudioState objects
  // (e.g. embedded template states) stay valid without this field.
  meshPoints?: MeshPoint[];
  presetId: string | null;
}

export const DEFAULT_MESH_POINTS: MeshPoint[] = [
  { color: "#667eea", x: 20, y: 25 },
  { color: "#764ba2", x: 80, y: 20 },
  { color: "#f093fb", x: 25, y: 80 },
  { color: "#4facfe", x: 80, y: 75 },
];

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
    meshPoints: DEFAULT_MESH_POINTS,
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
