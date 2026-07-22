import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Outfit, JetBrains_Mono, Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-outfit",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ff-jetbrains",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--ff-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gradientcraft.fun"),
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
    url: "https://www.gradientcraft.fun",
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
    canonical: "https://www.gradientcraft.fun",
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

export const viewport: Viewport = {
  themeColor: "#fafaf8",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} ${inter.variable} ${manrope.variable}`}
    >
      <body>
        {children}
        {/* Vercel injects /_vercel/insights/script.js only on deployed
            environments; rendering it in dev just 404s in the console. */}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
