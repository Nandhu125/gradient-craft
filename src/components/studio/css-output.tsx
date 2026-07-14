"use client";

import type { StudioState } from "@/types/studio";
import { generateCSS } from "@/lib/studio-css";
import { CheckIcon, CopyIcon, XIcon } from "@/components/ui/icons";

interface Props {
  state: StudioState;
  onCopy: () => void;
  copied: boolean;
  onClose: () => void;
}

export function CssOutput({ state, onCopy, copied, onClose }: Props) {
  const css = generateCSS(state);

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
          <span
            className="text-[13px] font-semibold"
            style={{ color: "#cc97ff", fontFamily: "var(--ff-manrope), 'Manrope', sans-serif" }}
          >
            Generated CSS
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
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
            <code>{css}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
