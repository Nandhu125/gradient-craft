import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Premade CSS Backgrounds | GradientCraft Templates",
  description:
    "24 production-ready CSS backgrounds — dark and light themes with gradients, patterns, and noise. Pick a template, edit in the Studio, copy the CSS.",
  keywords: [
    "CSS background templates",
    "premade CSS backgrounds",
    "CSS gradient templates",
    "dark CSS backgrounds",
    "light CSS backgrounds",
    "CSS pattern backgrounds",
    "ready-made web backgrounds",
    "CSS background library",
  ],
  openGraph: {
    title: "Premade CSS Backgrounds | GradientCraft Templates",
    description:
      "24 production-ready CSS backgrounds. Pick one, edit in Studio, copy the CSS.",
    url: "https://gradientcraft.fun/templates",
    siteName: "GradientCraft",
    type: "website",
  },
  alternates: {
    canonical: "https://gradientcraft.fun/templates",
  },
};

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return children;
}
