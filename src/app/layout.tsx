import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gradientcraft.fun"),
  title: "GradientCraft · CSS Background Studio",
  description: "The all-in-one CSS background composer. Layer gradients, patterns, noise, and animations visually — then copy production-ready CSS. Free and open source.",
  keywords: [
    "CSS background generator",
    "CSS gradient generator",
    "CSS pattern generator",
    "background composer",
    "CSS noise texture",
    "CSS background animations",
    "gradient maker",
    "CSS background studio",
    "web background tool",
    "CSS background layers",
    "visual CSS editor",
    "tailwind backgrounds",
  ],
  authors: [{ name: "Nandhu" }],
  creator: "Nandhu",
  openGraph: {
    title: "GradientCraft · CSS Background Studio",
    description: "Layer gradients, patterns, noise, and animations visually. Copy production-ready CSS.",
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
    title: "GradientCraft · CSS Background Studio",
    description: "Layer gradients, patterns, noise, and animations visually. Copy production-ready CSS.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
