"use client";

import { useState, useRef, useCallback } from "react";
import type { StudioState } from "@/types/studio";
import { generateCSS, generateTailwind } from "@/lib/studio-css";
import { CheckIcon, CopyIcon, XIcon } from "@/components/ui/icons";

interface Props {
  state: StudioState;
  onClose: () => void;
}

type Format = "css" | "tailwind";

export function CssOutput({ state, onClose }: Props) {
  const [format, setFormat] = useState<Format>("css");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const code = format === "css" ? generateCSS(state) : generateTailwind(state);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "rgba(0, 0, 0, 0.7)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-[600px] rounded-2xl overflow-hidden animate-[fadeInUp_0.3s_cubic-bezier(0.16,1,0.3,1)_both]"
        style={{
          background: "#131314",
          border: "1px solid rgba(204, 151, 255, 0.15)",
          boxShadow: "0 0 40px rgba(204, 151, 255, 0.1)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={{ borderColor: "rgba(72, 72, 73, 0.3)" }}
        >
          {/* Format toggle */}
          <div
            className="flex items-center gap-0.5 rounded-lg p-0.5"
            style={{ background: "#201f21", border: "1px solid rgba(72, 72, 73, 0.4)" }}
          >
            {(["css", "tailwind"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className="px-3 py-1 rounded-md text-[12px] font-semibold border-none cursor-pointer transition-all duration-200"
                style={{
                  background: format === f ? "#cc97ff" : "transparent",
                  color: format === f ? "#0e0e0f" : "#999",
                }}
              >
                {f === "css" ? "CSS" : "Tailwind"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold border-none transition-all duration-200 cursor-pointer"
              style={{
                background: "#cc97ff",
                color: "#0e0e0f",
              }}
            >
              {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer border-none"
              style={{ color: "#999", background: "transparent" }}
            >
              <XIcon size={18} />
            </button>
          </div>
        </div>

        {/* Code */}
        <div className="p-5 max-h-[60vh] overflow-y-auto scrollbar-hide">
          <pre
            className="text-[12.5px] leading-[1.7] font-mono whitespace-pre-wrap break-words m-0"
            style={{ color: "#ccc" }}
          >
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
