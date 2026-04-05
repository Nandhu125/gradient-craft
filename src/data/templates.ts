import type { CSSProperties } from "react";
import type { StudioState } from "@/types/studio";

export interface Template {
  id: string;
  name: string;
  category: "dark" | "light";
  layers: string;
  previewStyle: CSSProperties;
  css: string;
  studioState?: StudioState;
}

const NO_ANIM: Pick<StudioState, "noise" | "animation"> = {
  noise: { enabled: false, intensity: 0.65, opacity: 0.15 },
  animation: { enabled: false, speed: 1, direction: "normal", presetId: null },
};
const NO_GRADIENT: StudioState["gradient"] = {
  enabled: false,
  type: "linear",
  angle: 135,
  stops: [{ color: "#667eea", position: 0 }, { color: "#764ba2", position: 100 }],
  presetId: null,
};
const NO_PATTERN: StudioState["pattern"] = {
  enabled: false,
  type: "dots",
  size: 20,
  color: "#ffffff",
  opacity: 0.1,
};

export const TEMPLATES: Template[] = [
  // ── DARK THEMES ────────────────────────────────────────────────────────────
  {
    id: "midnight-orchid",
    name: "Midnight Orchid",
    category: "dark",
    layers: "Conic gradient · Dot grid",
    previewStyle: {
      backgroundColor: "#0a0a0a",
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px), conic-gradient(from 299deg at center, #5711a2 0%, #5c03b0 17%, #4a0080 33%, #8000ff 50%, #640aa4 66%, #4f0693 93%, #8b1fff 100%)",
      backgroundSize: "26px 26px, 100% 100%",
    },
    css: `.background {
  background-color: #0a0a0a;
  background-image:
    radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px),
    conic-gradient(from 299deg at center, #5711a2 0%, #5c03b0 17%, #4a0080 33%, #8000ff 50%, #640aa4 66%, #4f0693 93%, #8b1fff 100%);
  background-size: 26px 26px, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#0a0a0a" },
      gradient: { enabled: true, type: "conic", angle: 299, stops: [{ color: "#5711a2", position: 0 }, { color: "#5c03b0", position: 17 }, { color: "#4a0080", position: 33 }, { color: "#8000ff", position: 50 }, { color: "#640aa4", position: 66 }, { color: "#8b1fff", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 26, color: "#ffffff", opacity: 0.06 },
      ...NO_ANIM,
    },
  },
  {
    id: "ocean-floor",
    name: "Ocean Floor",
    category: "dark",
    layers: "Linear + 2 radial glows · Dot grid",
    previewStyle: {
      backgroundColor: "#020617",
      backgroundImage:
        "radial-gradient(circle, rgba(56,189,248,0.05) 1px, transparent 1px), radial-gradient(ellipse at 30% 70%, rgba(6,182,212,0.25) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.2) 0%, transparent 50%), linear-gradient(180deg, #020617 0%, #0c1a3a 50%, #020617 100%)",
      backgroundSize: "20px 20px, 100% 100%, 100% 100%, 100% 100%",
    },
    css: `.background {
  background-color: #020617;
  background-image:
    radial-gradient(circle, rgba(56,189,248,0.05) 1px, transparent 1px),
    radial-gradient(ellipse at 30% 70%, rgba(6,182,212,0.25) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.2) 0%, transparent 50%),
    linear-gradient(180deg, #020617 0%, #0c1a3a 50%, #020617 100%);
  background-size: 20px 20px, 100% 100%, 100% 100%, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#020617" },
      gradient: { enabled: true, type: "linear", angle: 180, stops: [{ color: "#020617", position: 0 }, { color: "#0c1a3a", position: 50 }, { color: "#020617", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 20, color: "#38bdf8", opacity: 0.05 },
      ...NO_ANIM,
    },
  },
  {
    id: "warm-ember",
    name: "Warm Ember",
    category: "dark",
    layers: "Linear + 2 radial glows",
    previewStyle: {
      backgroundColor: "#0a0604",
      backgroundImage:
        "radial-gradient(ellipse at 50% 100%, rgba(249,115,22,0.2) 0%, transparent 60%), radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.1) 0%, transparent 50%), linear-gradient(180deg, #0a0604 0%, #1c0f06 40%, #0a0604 100%)",
      backgroundSize: "100% 100%",
    },
    css: `.background {
  background-color: #0a0604;
  background-image:
    radial-gradient(ellipse at 50% 100%, rgba(249,115,22,0.2) 0%, transparent 60%),
    radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.1) 0%, transparent 50%),
    linear-gradient(180deg, #0a0604 0%, #1c0f06 40%, #0a0604 100%);
  background-size: 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#0a0604" },
      gradient: { enabled: true, type: "linear", angle: 180, stops: [{ color: "#0a0604", position: 0 }, { color: "#1c0f06", position: 40 }, { color: "#0a0604", position: 100 }], presetId: null },
      pattern: NO_PATTERN,
      ...NO_ANIM,
    },
  },
  {
    id: "neon-grid",
    name: "Neon Grid",
    category: "dark",
    layers: "Line grid · Radial glow",
    previewStyle: {
      backgroundColor: "#09090b",
      backgroundImage:
        "linear-gradient(rgba(139,92,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px), radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.12) 0%, transparent 60%)",
      backgroundSize: "48px 48px, 48px 48px, 100% 100%",
    },
    css: `.background {
  background-color: #09090b;
  background-image:
    linear-gradient(rgba(139,92,246,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px),
    radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.12) 0%, transparent 60%);
  background-size: 48px 48px, 48px 48px, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#09090b" },
      gradient: { enabled: true, type: "radial", angle: 0, stops: [{ color: "#1e1040", position: 0 }, { color: "#09090b", position: 60 }], presetId: null },
      pattern: { enabled: true, type: "grid", size: 48, color: "#8b5cf6", opacity: 0.07 },
      ...NO_ANIM,
    },
  },
  {
    id: "carbon-fiber",
    name: "Carbon Fiber",
    category: "dark",
    layers: "Diagonal checkerboard",
    previewStyle: {
      backgroundColor: "#111111",
      backgroundImage:
        "linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%), linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%)",
      backgroundSize: "16px 16px",
      backgroundPosition: "0 0, 8px 8px",
    },
    css: `.background {
  background-color: #111111;
  background-image:
    linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%),
    linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%);
  background-size: 16px 16px;
  background-position: 0 0, 8px 8px;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#111111" },
      gradient: NO_GRADIENT,
      pattern: { enabled: true, type: "checkerboard", size: 16, color: "#ffffff", opacity: 0.04 },
      ...NO_ANIM,
    },
  },
  {
    id: "aurora-silk",
    name: "Aurora Silk",
    category: "dark",
    layers: "3 radial glows · Dot grid",
    previewStyle: {
      backgroundColor: "#020210",
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px), radial-gradient(ellipse at 20% 50%, rgba(52,211,153,0.15) 0%, transparent 45%), radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.18) 0%, transparent 45%), radial-gradient(ellipse at 50% 80%, rgba(56,189,248,0.1) 0%, transparent 40%)",
      backgroundSize: "22px 22px, 100% 100%, 100% 100%, 100% 100%",
    },
    css: `.background {
  background-color: #020210;
  background-image:
    radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px),
    radial-gradient(ellipse at 20% 50%, rgba(52,211,153,0.15) 0%, transparent 45%),
    radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.18) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 80%, rgba(56,189,248,0.1) 0%, transparent 40%);
  background-size: 22px 22px, 100% 100%, 100% 100%, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#020210" },
      gradient: { enabled: true, type: "linear", angle: 135, stops: [{ color: "#020210", position: 0 }, { color: "#0d0a2a", position: 50 }, { color: "#020210", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 22, color: "#ffffff", opacity: 0.04 },
      ...NO_ANIM,
    },
  },
  {
    id: "cyber-pulse",
    name: "Cyber Pulse",
    category: "dark",
    layers: "Scanlines · Radial glow",
    previewStyle: {
      backgroundColor: "#0a0a0a",
      backgroundImage:
        "repeating-linear-gradient(0deg, rgba(0,255,136,0.03), rgba(0,255,136,0.03) 1px, transparent 1px, transparent 4px), radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.06) 0%, transparent 65%)",
      backgroundSize: "100% 4px, 100% 100%",
    },
    css: `.background {
  background-color: #0a0a0a;
  background-image:
    repeating-linear-gradient(0deg, rgba(0,255,136,0.03), rgba(0,255,136,0.03) 1px, transparent 1px, transparent 4px),
    radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.06) 0%, transparent 65%);
  background-size: 100% 4px, 100% 100%;
}`,
  },
  {
    id: "deep-cosmos",
    name: "Deep Cosmos",
    category: "dark",
    layers: "Star field · Purple nebula",
    previewStyle: {
      backgroundColor: "#030308",
      backgroundImage:
        "radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 45% 65%, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 75% 15%, rgba(255,255,255,0.25), transparent), radial-gradient(1px 1px at 85% 75%, rgba(255,255,255,0.15), transparent), radial-gradient(1px 1px at 35% 85%, rgba(255,255,255,0.2), transparent), radial-gradient(ellipse at 50% 50%, rgba(88,28,135,0.15) 0%, transparent 60%)",
      backgroundSize: "200px 200px, 200px 200px, 200px 200px, 200px 200px, 200px 200px, 100% 100%",
    },
    css: `.background {
  background-color: #030308;
  background-image:
    radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 45% 65%, rgba(255,255,255,0.2), transparent),
    radial-gradient(1px 1px at 75% 15%, rgba(255,255,255,0.25), transparent),
    radial-gradient(1px 1px at 85% 75%, rgba(255,255,255,0.15), transparent),
    radial-gradient(1px 1px at 35% 85%, rgba(255,255,255,0.2), transparent),
    radial-gradient(ellipse at 50% 50%, rgba(88,28,135,0.15) 0%, transparent 60%);
  background-size: 200px 200px, 200px 200px, 200px 200px, 200px 200px, 200px 200px, 100% 100%;
}`,
  },
  {
    id: "rose-dawn",
    name: "Rose Dawn",
    category: "dark",
    layers: "Linear + 2 radial · Dot grid",
    previewStyle: {
      backgroundColor: "#0c0008",
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px), radial-gradient(ellipse at 30% 60%, rgba(244,114,182,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 40%, rgba(251,113,133,0.12) 0%, transparent 45%), linear-gradient(160deg, #0c0008 0%, #1a0012 50%, #0c0008 100%)",
      backgroundSize: "24px 24px, 100% 100%, 100% 100%, 100% 100%",
    },
    css: `.background {
  background-color: #0c0008;
  background-image:
    radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px),
    radial-gradient(ellipse at 30% 60%, rgba(244,114,182,0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 40%, rgba(251,113,133,0.12) 0%, transparent 45%),
    linear-gradient(160deg, #0c0008 0%, #1a0012 50%, #0c0008 100%);
  background-size: 24px 24px, 100% 100%, 100% 100%, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#0c0008" },
      gradient: { enabled: true, type: "linear", angle: 160, stops: [{ color: "#0c0008", position: 0 }, { color: "#1a0012", position: 50 }, { color: "#0c0008", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 24, color: "#ffffff", opacity: 0.04 },
      ...NO_ANIM,
    },
  },
  {
    id: "blueprint",
    name: "Blueprint",
    category: "dark",
    layers: "Major + minor grid lines",
    previewStyle: {
      backgroundColor: "#0f172a",
      backgroundImage:
        "linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)",
      backgroundSize: "64px 64px, 64px 64px, 16px 16px, 16px 16px",
    },
    css: `.background {
  background-color: #0f172a;
  background-image:
    linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px),
    linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px);
  background-size: 64px 64px, 64px 64px, 16px 16px, 16px 16px;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#0f172a" },
      gradient: NO_GRADIENT,
      pattern: { enabled: true, type: "grid", size: 64, color: "#38bdf8", opacity: 0.06 },
      ...NO_ANIM,
    },
  },
  {
    id: "obsidian-grid",
    name: "Obsidian Grid",
    category: "dark",
    layers: "Line grid · 64px",
    previewStyle: {
      backgroundColor: "#09090b",
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      backgroundSize: "64px 64px",
    },
    css: `.background {
  background-color: #09090b;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 64px 64px;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#09090b" },
      gradient: NO_GRADIENT,
      pattern: { enabled: true, type: "grid", size: 64, color: "#ffffff", opacity: 0.04 },
      ...NO_ANIM,
    },
  },
  {
    id: "electric-dusk",
    name: "Electric Dusk",
    category: "dark",
    layers: "Conic spotlight · Dot grid",
    previewStyle: {
      backgroundColor: "#0a0a0a",
      backgroundImage:
        "conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.12) 0deg, transparent 60deg, transparent 300deg, rgba(99,102,241,0.12) 360deg), radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
      backgroundSize: "100% 100%, 20px 20px",
    },
    css: `.background {
  background-color: #0a0a0a;
  background-image:
    conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.12) 0deg, transparent 60deg, transparent 300deg, rgba(99,102,241,0.12) 360deg),
    radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 100% 100%, 20px 20px;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#0a0a0a" },
      gradient: { enabled: true, type: "conic", angle: 180, stops: [{ color: "#3730a3", position: 0 }, { color: "#0a0a0a", position: 17 }, { color: "#0a0a0a", position: 83 }, { color: "#3730a3", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 20, color: "#ffffff", opacity: 0.05 },
      ...NO_ANIM,
    },
  },
  {
    id: "void-matrix",
    name: "Void Matrix",
    category: "dark",
    layers: "Grid + dot intersections",
    previewStyle: {
      backgroundColor: "#000000",
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
      backgroundSize: "32px 32px, 32px 32px, 32px 32px",
    },
    css: `.background {
  background-color: #000000;
  background-image:
    radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 32px 32px, 32px 32px, 32px 32px;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#000000" },
      gradient: NO_GRADIENT,
      pattern: { enabled: true, type: "grid", size: 32, color: "#ffffff", opacity: 0.02 },
      ...NO_ANIM,
    },
  },
  {
    id: "molten-core",
    name: "Molten Core",
    category: "dark",
    layers: "Conic + radial glow · Dot grid",
    previewStyle: {
      backgroundColor: "#0a0400",
      backgroundImage:
        "radial-gradient(circle, rgba(251,191,36,0.04) 1px, transparent 1px), conic-gradient(from 45deg at 50% 50%, #0a0400 0%, #1a0e00 12%, #2d1600 25%, #4a2500 37%, #2d1600 50%, #1a0e00 62%, #0a0400 75%, #1a0e00 87%, #0a0400 100%), radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.15) 0%, transparent 55%)",
      backgroundSize: "18px 18px, 100% 100%, 100% 100%",
    },
    css: `.background {
  background-color: #0a0400;
  background-image:
    radial-gradient(circle, rgba(251,191,36,0.04) 1px, transparent 1px),
    conic-gradient(from 45deg at 50% 50%, #0a0400 0%, #1a0e00 12%, #2d1600 25%, #4a2500 37%, #2d1600 50%, #1a0e00 62%, #0a0400 75%, #1a0e00 87%, #0a0400 100%),
    radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.15) 0%, transparent 55%);
  background-size: 18px 18px, 100% 100%, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#0a0400" },
      gradient: { enabled: true, type: "conic", angle: 45, stops: [{ color: "#0a0400", position: 0 }, { color: "#2d1600", position: 25 }, { color: "#4a2500", position: 37 }, { color: "#2d1600", position: 50 }, { color: "#0a0400", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 18, color: "#fbbf24", opacity: 0.04 },
      ...NO_ANIM,
    },
  },

  // ── LIGHT THEMES ───────────────────────────────────────────────────────────
  {
    id: "lavender-lattice",
    name: "Lavender Lattice",
    category: "light",
    layers: "Purple grid · Dual radial glows",
    previewStyle: {
      backgroundColor: "#f3f0ff",
      backgroundImage:
        "linear-gradient(rgba(139,92,246,0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(139,92,246,0.08) 1.5px, transparent 1.5px), radial-gradient(ellipse at 30% 30%, rgba(139,92,246,0.12) 0%, transparent 50%), radial-gradient(ellipse at 75% 75%, rgba(196,181,253,0.15) 0%, transparent 50%)",
      backgroundSize: "40px 40px, 40px 40px, 100% 100%, 100% 100%",
    },
    css: `.background {
  background-color: #f3f0ff;
  background-image:
    linear-gradient(rgba(139,92,246,0.08) 1.5px, transparent 1.5px),
    linear-gradient(90deg, rgba(139,92,246,0.08) 1.5px, transparent 1.5px),
    radial-gradient(ellipse at 30% 30%, rgba(139,92,246,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 75% 75%, rgba(196,181,253,0.15) 0%, transparent 50%);
  background-size: 40px 40px, 40px 40px, 100% 100%, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#f3f0ff" },
      gradient: { enabled: true, type: "radial", angle: 0, stops: [{ color: "#ede9fe", position: 0 }, { color: "#f3f0ff", position: 70 }], presetId: null },
      pattern: { enabled: true, type: "grid", size: 40, color: "#8b5cf6", opacity: 0.08 },
      ...NO_ANIM,
    },
  },
  {
    id: "coral-mesh",
    name: "Coral Mesh",
    category: "light",
    layers: "Gradient + 2 side glows · Dot grid",
    previewStyle: {
      backgroundColor: "#fff5f5",
      backgroundImage:
        "radial-gradient(circle, rgba(244,63,94,0.06) 1.5px, transparent 1.5px), radial-gradient(ellipse at 0% 50%, rgba(251,113,133,0.2) 0%, transparent 45%), radial-gradient(ellipse at 100% 50%, rgba(249,115,22,0.15) 0%, transparent 45%), linear-gradient(135deg, #fff5f5 0%, #fef2f2 30%, #fff7ed 60%, #fff5f5 100%)",
      backgroundSize: "22px 22px, 100% 100%, 100% 100%, 100% 100%",
    },
    css: `.background {
  background-color: #fff5f5;
  background-image:
    radial-gradient(circle, rgba(244,63,94,0.06) 1.5px, transparent 1.5px),
    radial-gradient(ellipse at 0% 50%, rgba(251,113,133,0.2) 0%, transparent 45%),
    radial-gradient(ellipse at 100% 50%, rgba(249,115,22,0.15) 0%, transparent 45%),
    linear-gradient(135deg, #fff5f5 0%, #fef2f2 30%, #fff7ed 60%, #fff5f5 100%);
  background-size: 22px 22px, 100% 100%, 100% 100%, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#fff5f5" },
      gradient: { enabled: true, type: "linear", angle: 135, stops: [{ color: "#fff5f5", position: 0 }, { color: "#fef2f2", position: 30 }, { color: "#fff7ed", position: 60 }, { color: "#fff5f5", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 22, color: "#f43f5e", opacity: 0.06 },
      ...NO_ANIM,
    },
  },
  {
    id: "mint-blueprint",
    name: "Mint Blueprint",
    category: "light",
    layers: "Major + minor teal grid",
    previewStyle: {
      backgroundColor: "#f0fdfa",
      backgroundImage:
        "linear-gradient(rgba(20,184,166,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.06) 1px, transparent 1px), linear-gradient(rgba(20,184,166,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.03) 1px, transparent 1px)",
      backgroundSize: "60px 60px, 60px 60px, 15px 15px, 15px 15px",
    },
    css: `.background {
  background-color: #f0fdfa;
  background-image:
    linear-gradient(rgba(20,184,166,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20,184,166,0.06) 1px, transparent 1px),
    linear-gradient(rgba(20,184,166,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20,184,166,0.03) 1px, transparent 1px);
  background-size: 60px 60px, 60px 60px, 15px 15px, 15px 15px;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#f0fdfa" },
      gradient: NO_GRADIENT,
      pattern: { enabled: true, type: "grid", size: 60, color: "#14b8a6", opacity: 0.06 },
      ...NO_ANIM,
    },
  },
  {
    id: "peach-conic",
    name: "Peach Conic",
    category: "light",
    layers: "Conic gradient · Radial glow · Dots",
    previewStyle: {
      backgroundColor: "#fffbf5",
      backgroundImage:
        "radial-gradient(circle, rgba(251,146,60,0.05) 1px, transparent 1px), conic-gradient(from 200deg at 50% 50%, rgba(253,186,116,0.08) 0%, rgba(252,165,165,0.1) 25%, rgba(253,186,116,0.05) 50%, rgba(254,215,170,0.1) 75%, rgba(253,186,116,0.08) 100%), radial-gradient(ellipse at 50% 50%, rgba(251,146,60,0.08) 0%, transparent 60%)",
      backgroundSize: "24px 24px, 100% 100%, 100% 100%",
    },
    css: `.background {
  background-color: #fffbf5;
  background-image:
    radial-gradient(circle, rgba(251,146,60,0.05) 1px, transparent 1px),
    conic-gradient(from 200deg at 50% 50%, rgba(253,186,116,0.08) 0%, rgba(252,165,165,0.1) 25%, rgba(253,186,116,0.05) 50%, rgba(254,215,170,0.1) 75%, rgba(253,186,116,0.08) 100%),
    radial-gradient(ellipse at 50% 50%, rgba(251,146,60,0.08) 0%, transparent 60%);
  background-size: 24px 24px, 100% 100%, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#fffbf5" },
      gradient: { enabled: true, type: "conic", angle: 200, stops: [{ color: "#fde68a", position: 0 }, { color: "#fca5a5", position: 25 }, { color: "#fed7aa", position: 50 }, { color: "#fde68a", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 24, color: "#fb923c", opacity: 0.05 },
      ...NO_ANIM,
    },
  },
  {
    id: "sky-diagonal",
    name: "Sky Diagonal",
    category: "light",
    layers: "Diagonal lines · Dual glows",
    previewStyle: {
      backgroundColor: "#f0f9ff",
      backgroundImage:
        "repeating-linear-gradient(135deg, rgba(56,189,248,0.04), rgba(56,189,248,0.04) 1px, transparent 1px, transparent 12px), radial-gradient(ellipse at 70% 20%, rgba(56,189,248,0.12) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 50%)",
      backgroundSize: "17px 17px, 100% 100%, 100% 100%",
    },
    css: `.background {
  background-color: #f0f9ff;
  background-image:
    repeating-linear-gradient(135deg, rgba(56,189,248,0.04), rgba(56,189,248,0.04) 1px, transparent 1px, transparent 12px),
    radial-gradient(ellipse at 70% 20%, rgba(56,189,248,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 50%);
  background-size: 17px 17px, 100% 100%, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#f0f9ff" },
      gradient: { enabled: true, type: "linear", angle: 135, stops: [{ color: "#e0f2fe", position: 0 }, { color: "#f0f9ff", position: 60 }], presetId: null },
      pattern: { enabled: true, type: "diagonal", size: 12, color: "#38bdf8", opacity: 0.04 },
      ...NO_ANIM,
    },
  },
  {
    id: "rose-dots",
    name: "Rose Dots",
    category: "light",
    layers: "Pink dot grid · Top/bottom glows",
    previewStyle: {
      backgroundColor: "#fdf2f8",
      backgroundImage:
        "radial-gradient(circle, rgba(236,72,153,0.08) 2px, transparent 2px), radial-gradient(ellipse at 50% 0%, rgba(244,114,182,0.15) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(219,39,119,0.08) 0%, transparent 50%)",
      backgroundSize: "28px 28px, 100% 100%, 100% 100%",
    },
    css: `.background {
  background-color: #fdf2f8;
  background-image:
    radial-gradient(circle, rgba(236,72,153,0.08) 2px, transparent 2px),
    radial-gradient(ellipse at 50% 0%, rgba(244,114,182,0.15) 0%, transparent 55%),
    radial-gradient(ellipse at 50% 100%, rgba(219,39,119,0.08) 0%, transparent 50%);
  background-size: 28px 28px, 100% 100%, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#fdf2f8" },
      gradient: { enabled: true, type: "radial", angle: 0, stops: [{ color: "#fce7f3", position: 0 }, { color: "#fdf2f8", position: 70 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 28, color: "#ec4899", opacity: 0.08 },
      ...NO_ANIM,
    },
  },
  {
    id: "lemon-cross",
    name: "Lemon Cross",
    category: "light",
    layers: "Grid + dot intersections · Glow",
    previewStyle: {
      backgroundColor: "#fefce8",
      backgroundImage:
        "radial-gradient(circle, rgba(202,138,4,0.07) 1.5px, transparent 1.5px), linear-gradient(rgba(202,138,4,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(202,138,4,0.04) 1px, transparent 1px), radial-gradient(ellipse at 60% 40%, rgba(234,179,8,0.1) 0%, transparent 55%)",
      backgroundSize: "36px 36px, 36px 36px, 36px 36px, 100% 100%",
    },
    css: `.background {
  background-color: #fefce8;
  background-image:
    radial-gradient(circle, rgba(202,138,4,0.07) 1.5px, transparent 1.5px),
    linear-gradient(rgba(202,138,4,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(202,138,4,0.04) 1px, transparent 1px),
    radial-gradient(ellipse at 60% 40%, rgba(234,179,8,0.1) 0%, transparent 55%);
  background-size: 36px 36px, 36px 36px, 36px 36px, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#fefce8" },
      gradient: { enabled: true, type: "radial", angle: 0, stops: [{ color: "#fef9c3", position: 0 }, { color: "#fefce8", position: 70 }], presetId: null },
      pattern: { enabled: true, type: "grid", size: 36, color: "#ca8a04", opacity: 0.04 },
      ...NO_ANIM,
    },
  },
  {
    id: "slate-weave",
    name: "Slate Weave",
    category: "light",
    layers: "Grid + diagonal crosshatch",
    previewStyle: {
      backgroundColor: "#f8fafc",
      backgroundImage:
        "repeating-linear-gradient(0deg, rgba(71,85,105,0.03), rgba(71,85,105,0.03) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(90deg, rgba(71,85,105,0.03), rgba(71,85,105,0.03) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(45deg, rgba(71,85,105,0.015), rgba(71,85,105,0.015) 1px, transparent 1px, transparent 16px), repeating-linear-gradient(-45deg, rgba(71,85,105,0.015), rgba(71,85,105,0.015) 1px, transparent 1px, transparent 16px)",
      backgroundSize: "8px 8px, 8px 8px, 22.6px 22.6px, 22.6px 22.6px",
    },
    css: `.background {
  background-color: #f8fafc;
  background-image:
    repeating-linear-gradient(0deg, rgba(71,85,105,0.03), rgba(71,85,105,0.03) 1px, transparent 1px, transparent 8px),
    repeating-linear-gradient(90deg, rgba(71,85,105,0.03), rgba(71,85,105,0.03) 1px, transparent 1px, transparent 8px),
    repeating-linear-gradient(45deg, rgba(71,85,105,0.015), rgba(71,85,105,0.015) 1px, transparent 1px, transparent 16px),
    repeating-linear-gradient(-45deg, rgba(71,85,105,0.015), rgba(71,85,105,0.015) 1px, transparent 1px, transparent 16px);
  background-size: 8px 8px, 8px 8px, 22.6px 22.6px, 22.6px 22.6px;
}`,
  },
  {
    id: "violet-spotlight",
    name: "Violet Spotlight",
    category: "light",
    layers: "Conic + radial glow · Noise",
    previewStyle: {
      backgroundColor: "#faf5ff",
      backgroundImage:
        "conic-gradient(from 0deg at 50% 40%, rgba(139,92,246,0.06) 0deg, rgba(192,132,252,0.08) 90deg, rgba(139,92,246,0.03) 180deg, rgba(167,139,250,0.07) 270deg, rgba(139,92,246,0.06) 360deg), radial-gradient(ellipse at 50% 35%, rgba(139,92,246,0.1) 0%, transparent 50%)",
      backgroundSize: "100% 100%, 100% 100%",
    },
    css: `.background {
  background-color: #faf5ff;
  background-image:
    conic-gradient(from 0deg at 50% 40%, rgba(139,92,246,0.06) 0deg, rgba(192,132,252,0.08) 90deg, rgba(139,92,246,0.03) 180deg, rgba(167,139,250,0.07) 270deg, rgba(139,92,246,0.06) 360deg),
    radial-gradient(ellipse at 50% 35%, rgba(139,92,246,0.1) 0%, transparent 50%);
  background-size: 100% 100%, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#faf5ff" },
      gradient: { enabled: true, type: "conic", angle: 0, stops: [{ color: "#ede9fe", position: 0 }, { color: "#f5f3ff", position: 25 }, { color: "#faf5ff", position: 50 }, { color: "#f5f3ff", position: 75 }, { color: "#ede9fe", position: 100 }], presetId: null },
      pattern: NO_PATTERN,
      noise: { enabled: true, intensity: 0.4, opacity: 0.025 },
      animation: { enabled: false, speed: 1, direction: "normal", presetId: null },
    },
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    category: "light",
    layers: "Diagonal cross · Dual cyan glows",
    previewStyle: {
      backgroundColor: "#ecfeff",
      backgroundImage:
        "repeating-linear-gradient(135deg, rgba(6,182,212,0.04), rgba(6,182,212,0.04) 1px, transparent 1px, transparent 16px), repeating-linear-gradient(45deg, rgba(6,182,212,0.04), rgba(6,182,212,0.04) 1px, transparent 1px, transparent 16px), radial-gradient(ellipse at 25% 25%, rgba(34,211,238,0.12) 0%, transparent 50%), radial-gradient(ellipse at 75% 75%, rgba(6,182,212,0.1) 0%, transparent 50%)",
      backgroundSize: "22.6px 22.6px, 22.6px 22.6px, 100% 100%, 100% 100%",
    },
    css: `.background {
  background-color: #ecfeff;
  background-image:
    repeating-linear-gradient(135deg, rgba(6,182,212,0.04), rgba(6,182,212,0.04) 1px, transparent 1px, transparent 16px),
    repeating-linear-gradient(45deg, rgba(6,182,212,0.04), rgba(6,182,212,0.04) 1px, transparent 1px, transparent 16px),
    radial-gradient(ellipse at 25% 25%, rgba(34,211,238,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 75% 75%, rgba(6,182,212,0.1) 0%, transparent 50%);
  background-size: 22.6px 22.6px, 22.6px 22.6px, 100% 100%, 100% 100%;
}`,
    studioState: {
      baseColor: { enabled: true, color: "#ecfeff" },
      gradient: { enabled: true, type: "linear", angle: 135, stops: [{ color: "#cffafe", position: 0 }, { color: "#ecfeff", position: 60 }], presetId: null },
      pattern: { enabled: true, type: "diagonal", size: 16, color: "#06b6d4", opacity: 0.04 },
      ...NO_ANIM,
    },
  },
];

export const DARK_TEMPLATES = TEMPLATES.filter((t) => t.category === "dark");
export const LIGHT_TEMPLATES = TEMPLATES.filter((t) => t.category === "light");
