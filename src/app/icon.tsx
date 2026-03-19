import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "GradientCraft Logo";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="face-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="face-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <linearGradient id="face-right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <g>
            <path d="M5.5 10.5 L16 16.5 L16 28 L5.5 22 Z" fill="url(#face-left)" />
            <path d="M16 16.5 L26.5 10.5 L26.5 22 L16 28 Z" fill="url(#face-right)" />
            <path d="M16 4.5 L26.5 10.5 L16 16.5 L5.5 10.5 Z" fill="url(#face-top)" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
