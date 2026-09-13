import type { CSSProperties } from "react";
import type { StudioState } from "@/types/studio";

export interface Template {
  id: string;
  name: string;
  category: "dark" | "light";
  tags: string[];
  layers: string[];
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
  enabled: false, type: "dots", size: 20, color: "#ffffff", opacity: 0.1,
};

const NOISE_SVG_200 = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;
const NOISE_SVG_256 = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`;

export const TEMPLATES: Template[] = [
  {
    id: "purple-conic",
    name: "Purple Conic",
    category: "dark",
    tags: ["dark", "pattern"],
    layers: ["Conic Gradient", "Dot Grid"],
    previewStyle: {
      backgroundColor: "#0a0a0a",
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px), conic-gradient(from 299deg at center, #5711a2 0%, #5c03b0 17%, #4a0080 33%, #8000ff 50%, #640aa4 66%, #4f0693 93%, #8b1fff 100%)",
      backgroundSize: "26px 26px, 100% 100%",
    },
    css: `background-color: #0a0a0a;
background-image:
  radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px),
  conic-gradient(from 299deg at center, #5711a2 0%, #5c03b0 17%, #4a0080 33%, #8000ff 50%, #640aa4 66%, #4f0693 93%, #8b1fff 100%);
background-size: 26px 26px, 100% 100%;`,
    studioState: {
      baseColor: { enabled: true, color: "#0a0a0a" },
      gradient: { enabled: true, type: "conic", angle: 299, stops: [{ color: "#5711a2", position: 0 }, { color: "#5c03b0", position: 17 }, { color: "#4a0080", position: 33 }, { color: "#8000ff", position: 50 }, { color: "#640aa4", position: 66 }, { color: "#8b1fff", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 26, color: "#ffffff", opacity: 0.08 },
      ...NO_ANIM,
    },
  },
  {
    id: "ocean-mesh",
    name: "Ocean Mesh",
    category: "dark",
    tags: ["dark", "mesh"],
    layers: ["Mesh Gradient", "4 Orbs"],
    previewStyle: {
      backgroundColor: "#0c1445",
      backgroundImage:
        "radial-gradient(at 20% 30%, rgba(56,189,248,0.4) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(139,92,246,0.3) 0px, transparent 50%), radial-gradient(at 60% 80%, rgba(6,182,212,0.35) 0px, transparent 50%), radial-gradient(at 20% 90%, rgba(59,130,246,0.3) 0px, transparent 50%)",
    },
    css: `background-color: #0c1445;
background-image:
  radial-gradient(at 20% 30%, rgba(56,189,248,0.4) 0px, transparent 50%),
  radial-gradient(at 80% 20%, rgba(139,92,246,0.3) 0px, transparent 50%),
  radial-gradient(at 60% 80%, rgba(6,182,212,0.35) 0px, transparent 50%),
  radial-gradient(at 20% 90%, rgba(59,130,246,0.3) 0px, transparent 50%);`,
  },
  {
    id: "sunset-warm",
    name: "Sunset Warm",
    category: "dark",
    tags: ["dark", "pattern"],
    layers: ["Linear Gradient", "Noise"],
    previewStyle: {
      backgroundColor: "#1a0a0a",
      backgroundImage: `${NOISE_SVG_200}, linear-gradient(135deg, #1a0a0a 0%, #4a1010 25%, #c2410c 50%, #f59e0b 75%, #fbbf24 100%)`,
      backgroundSize: "200px 200px, 100% 100%",
    },
    css: `background-color: #1a0a0a;
background-image:
  url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E"),
  linear-gradient(135deg, #1a0a0a 0%, #4a1010 25%, #c2410c 50%, #f59e0b 75%, #fbbf24 100%);
background-size: 200px 200px, 100% 100%;`,
    studioState: {
      baseColor: { enabled: true, color: "#1a0a0a" },
      gradient: { enabled: true, type: "linear", angle: 135, stops: [{ color: "#1a0a0a", position: 0 }, { color: "#4a1010", position: 25 }, { color: "#c2410c", position: 50 }, { color: "#f59e0b", position: 75 }, { color: "#fbbf24", position: 100 }], presetId: null },
      pattern: NO_PATTERN,
      noise: { enabled: true, intensity: 0.8, opacity: 0.08 },
      animation: { enabled: false, speed: 1, direction: "normal", presetId: null },
    },
  },
  {
    id: "mint-grid",
    name: "Mint Grid",
    category: "light",
    tags: ["light", "grid"],
    layers: ["Grid Pattern", "Radial Glow"],
    previewStyle: {
      backgroundColor: "#f0fdfa",
      backgroundImage:
        "linear-gradient(rgba(20,184,166,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.08) 1px, transparent 1px), radial-gradient(ellipse at 50% 0%, rgba(20,184,166,0.15) 0%, transparent 70%)",
      backgroundSize: "32px 32px, 32px 32px, 100% 100%",
    },
    css: `background-color: #f0fdfa;
background-image:
  linear-gradient(rgba(20,184,166,0.08) 1px, transparent 1px),
  linear-gradient(90deg, rgba(20,184,166,0.08) 1px, transparent 1px),
  radial-gradient(ellipse at 50% 0%, rgba(20,184,166,0.15) 0%, transparent 70%);
background-size: 32px 32px, 32px 32px, 100% 100%;`,
    studioState: {
      baseColor: { enabled: true, color: "#f0fdfa" },
      gradient: { enabled: true, type: "radial", angle: 0, stops: [{ color: "#ccfbf1", position: 0 }, { color: "#f0fdfa", position: 70 }], presetId: null },
      pattern: { enabled: true, type: "grid", size: 32, color: "#14b8a6", opacity: 0.08 },
      ...NO_ANIM,
    },
  },
  {
    id: "dark-dashboard",
    name: "Dark Dashboard",
    category: "dark",
    tags: ["dark", "grid"],
    layers: ["Grid", "Radial Glow"],
    previewStyle: {
      backgroundColor: "#09090b",
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)",
      backgroundSize: "24px 24px, 24px 24px, 100% 100%",
    },
    css: `background-color: #09090b;
background-image:
  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
  radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%);
background-size: 24px 24px, 24px 24px, 100% 100%;`,
    studioState: {
      baseColor: { enabled: true, color: "#09090b" },
      gradient: { enabled: true, type: "radial", angle: 0, stops: [{ color: "#1e1b4b", position: 0 }, { color: "#09090b", position: 60 }], presetId: null },
      pattern: { enabled: true, type: "grid", size: 24, color: "#ffffff", opacity: 0.03 },
      ...NO_ANIM,
    },
  },
  {
    id: "aurora-flow",
    name: "Aurora Flow",
    category: "dark",
    tags: ["dark", "mesh"],
    layers: ["Mesh Gradient", "4 Orbs"],
    previewStyle: {
      backgroundColor: "#0a0a12",
      backgroundImage:
        "radial-gradient(at 27% 37%, rgba(129,140,248,0.5) 0px, transparent 50%), radial-gradient(at 97% 21%, rgba(52,211,153,0.35) 0px, transparent 50%), radial-gradient(at 52% 99%, rgba(251,113,133,0.4) 0px, transparent 50%), radial-gradient(at 10% 29%, rgba(139,92,246,0.4) 0px, transparent 50%)",
    },
    css: `background-color: #0a0a12;
background-image:
  radial-gradient(at 27% 37%, rgba(129,140,248,0.5) 0px, transparent 50%),
  radial-gradient(at 97% 21%, rgba(52,211,153,0.35) 0px, transparent 50%),
  radial-gradient(at 52% 99%, rgba(251,113,133,0.4) 0px, transparent 50%),
  radial-gradient(at 10% 29%, rgba(139,92,246,0.4) 0px, transparent 50%);`,
  },
  {
    id: "peach-dots",
    name: "Peach Dots",
    category: "light",
    tags: ["light", "pattern"],
    layers: ["Dot Pattern", "Linear Gradient"],
    previewStyle: {
      backgroundColor: "#fef3c7",
      backgroundImage:
        "radial-gradient(circle at 1px 1px, rgba(251,146,60,0.25) 1px, transparent 0), linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",
      backgroundSize: "20px 20px, 100% 100%",
    },
    css: `background-color: #fef3c7;
background-image:
  radial-gradient(circle at 1px 1px, rgba(251,146,60,0.25) 1px, transparent 0),
  linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
background-size: 20px 20px, 100% 100%;`,
    studioState: {
      baseColor: { enabled: true, color: "#fef3c7" },
      gradient: { enabled: true, type: "linear", angle: 135, stops: [{ color: "#fef3c7", position: 0 }, { color: "#fed7aa", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 20, color: "#fb923c", opacity: 0.25 },
      ...NO_ANIM,
    },
  },
  {
    id: "neon-cyber",
    name: "Neon Cyber",
    category: "dark",
    tags: ["dark", "grid"],
    layers: ["Grid", "Linear Gradient"],
    previewStyle: {
      backgroundColor: "#020617",
      backgroundImage:
        "linear-gradient(rgba(236,72,153,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.08) 1px, transparent 1px), linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #020617 100%)",
      backgroundSize: "40px 40px, 40px 40px, 100% 100%",
    },
    css: `background-color: #020617;
background-image:
  linear-gradient(rgba(236,72,153,0.08) 1px, transparent 1px),
  linear-gradient(90deg, rgba(6,182,212,0.08) 1px, transparent 1px),
  linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #020617 100%);
background-size: 40px 40px, 40px 40px, 100% 100%;`,
    studioState: {
      baseColor: { enabled: true, color: "#020617" },
      gradient: { enabled: true, type: "linear", angle: 135, stops: [{ color: "#020617", position: 0 }, { color: "#1e1b4b", position: 50 }, { color: "#020617", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "grid", size: 40, color: "#06b6d4", opacity: 0.08 },
      ...NO_ANIM,
    },
  },
  {
    id: "lavender-soft",
    name: "Lavender Soft",
    category: "light",
    tags: ["light", "mesh"],
    layers: ["Mesh Gradient", "3 Orbs"],
    previewStyle: {
      backgroundColor: "#faf5ff",
      backgroundImage:
        "radial-gradient(at 30% 20%, rgba(196,181,253,0.4) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(251,207,232,0.4) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(221,214,254,0.3) 0px, transparent 50%)",
    },
    css: `background-color: #faf5ff;
background-image:
  radial-gradient(at 30% 20%, rgba(196,181,253,0.4) 0px, transparent 50%),
  radial-gradient(at 80% 80%, rgba(251,207,232,0.4) 0px, transparent 50%),
  radial-gradient(at 50% 50%, rgba(221,214,254,0.3) 0px, transparent 50%);`,
  },
  {
    id: "carbon-diagonal",
    name: "Carbon Diagonal",
    category: "dark",
    tags: ["dark", "pattern"],
    layers: ["Diagonal Lines", "Linear"],
    previewStyle: {
      backgroundColor: "#18181b",
      backgroundImage:
        "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 12px), linear-gradient(135deg, #18181b 0%, #27272a 50%, #18181b 100%)",
    },
    css: `background-color: #18181b;
background-image:
  repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 12px),
  linear-gradient(135deg, #18181b 0%, #27272a 50%, #18181b 100%);`,
    studioState: {
      baseColor: { enabled: true, color: "#18181b" },
      gradient: { enabled: true, type: "linear", angle: 135, stops: [{ color: "#18181b", position: 0 }, { color: "#27272a", position: 50 }, { color: "#18181b", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "diagonal", size: 12, color: "#ffffff", opacity: 0.02 },
      ...NO_ANIM,
    },
  },
  {
    id: "emerald-haze",
    name: "Emerald Haze",
    category: "dark",
    tags: ["dark", "mesh"],
    layers: ["Noise", "Mesh", "Linear"],
    previewStyle: {
      backgroundColor: "#022c22",
      backgroundImage: `${NOISE_SVG_256}, radial-gradient(at 30% 40%, rgba(52,211,153,0.4) 0px, transparent 50%), radial-gradient(at 70% 70%, rgba(16,185,129,0.5) 0px, transparent 50%), linear-gradient(135deg, #022c22 0%, #064e3b 100%)`,
      backgroundSize: "256px 256px, 100% 100%, 100% 100%, 100% 100%",
    },
    css: `background-color: #022c22;
background-image:
  url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E"),
  radial-gradient(at 30% 40%, rgba(52,211,153,0.4) 0px, transparent 50%),
  radial-gradient(at 70% 70%, rgba(16,185,129,0.5) 0px, transparent 50%),
  linear-gradient(135deg, #022c22 0%, #064e3b 100%);
background-size: 256px 256px, 100% 100%, 100% 100%, 100% 100%;`,
  },
  {
    id: "ivory-dots",
    name: "Ivory Dots",
    category: "light",
    tags: ["light", "pattern"],
    layers: ["Offset Dots", "Linear"],
    previewStyle: {
      backgroundColor: "#fffbeb",
      backgroundImage:
        "radial-gradient(circle at 50% 50%, rgba(234,179,8,0.1) 2px, transparent 2px), radial-gradient(circle at 0% 0%, rgba(234,179,8,0.08) 2px, transparent 2px), linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      backgroundSize: "24px 24px, 24px 24px, 100% 100%",
      backgroundPosition: "0 0, 12px 12px, 0 0",
    },
    css: `background-color: #fffbeb;
background-image:
  radial-gradient(circle at 50% 50%, rgba(234,179,8,0.1) 2px, transparent 2px),
  radial-gradient(circle at 0% 0%, rgba(234,179,8,0.08) 2px, transparent 2px),
  linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
background-size: 24px 24px, 24px 24px, 100% 100%;
background-position: 0 0, 12px 12px, 0 0;`,
    studioState: {
      baseColor: { enabled: true, color: "#fffbeb" },
      gradient: { enabled: true, type: "linear", angle: 135, stops: [{ color: "#fffbeb", position: 0 }, { color: "#fef3c7", position: 100 }], presetId: null },
      pattern: { enabled: true, type: "dots", size: 24, color: "#eab308", opacity: 0.1 },
      ...NO_ANIM,
    },
  },
];
