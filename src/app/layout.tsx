import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gradientcraft.fun"),
  title: "GradientCraft · Animated CSS Gradients",
  description: "A curated collection of production-ready animated CSS backgrounds. Browse, preview full-page, tune the animation live, and copy the complete CSS in one click.",
  keywords: [
    "animated CSS gradients",
    "CSS background animations",
    "animated backgrounds",
    "CSS keyframes",
    "gradient library",
    "CSS gradients",
    "animated gradient generator",
    "web backgrounds",
    "aurora gradient",
    "neon gradient CSS",
    "next.js gradients",
    "tailwind gradients",
  ],
  authors: [{ name: "Nandhu" }],
  creator: "Nandhu",
  openGraph: {
    title: "GradientCraft · Animated CSS Gradients",
    description: "Production-ready animated CSS backgrounds. Preview full-page, tune live, copy in one click.",
    url: "https://gradientcraft.fun",
    siteName: "GradientCraft",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GradientCraft — Animated CSS Backgrounds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GradientCraft · Animated CSS Gradients",
    description: "Production-ready animated CSS backgrounds. Preview full-page, tune live, copy in one click.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://gradientcraft.fun",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
