import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "CSS Background Studio | GradientCraft",
  description:
    "Compose layered CSS backgrounds with gradients, patterns, noise textures, and animations. Free, no signup, pure CSS output.",
  openGraph: {
    title: "CSS Background Studio | GradientCraft",
    description:
      "Compose layered CSS backgrounds with gradients, patterns, noise, and animations. Copy production-ready CSS in one click.",
    url: "https://gradientcraft.fun/studio",
    siteName: "GradientCraft",
    type: "website",
  },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children;
}
