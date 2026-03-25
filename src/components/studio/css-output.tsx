"use client";

import type { StudioState } from "@/types/studio";
import { generateCSS } from "@/lib/studio-css";

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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[600px] bg-[#111] border border-white/10 rounded-2xl overflow-hidden animate-[fadeInUp_0.3s_cubic-bezier(0.16,1,0.3,1)_both]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8">
          <span className="text-[13px] font-semibold text-white/80">
            Generated CSS
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
              className="px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-white text-[#0a0a0a] hover:bg-white/90 border-none transition-all duration-200 cursor-pointer"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white/70 hover:bg-white/8 transition-all duration-200 cursor-pointer border-none"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Code */}
        <div className="p-5 max-h-[60vh] overflow-y-auto scrollbar-hide">
          <pre className="text-[12.5px] leading-[1.7] font-mono text-white/70 whitespace-pre-wrap break-words m-0">
            <code>{css}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
