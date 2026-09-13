"use client";

import { useState, useCallback } from "react";
import type { StudioState } from "@/types/studio";
import { generateCSS, generateTailwind, type CssScope } from "@/lib/studio-css";
import { copyToClipboard } from "@/lib/utils";
import { useEscapeKey } from "@/lib/use-escape-key";
import { useTimedFlag } from "@/lib/use-timed-flag";
import { CheckIcon, CopyIcon, XIcon } from "@/components/ui/icons";

interface Props {
  state: StudioState;
  onClose: () => void;
}

type OutputTarget = "body" | "hero" | "card" | "tailwind";

export function CssOutput({ state, onClose }: Props) {
  const [target, setTarget] = useState<OutputTarget>("body");
  const [copied, flagCopied] = useTimedFlag();

  const code =
    target === "tailwind"
      ? generateTailwind(state)
      : generateCSS(state, target as CssScope);

  useEscapeKey(onClose);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(code);
    flagCopied();
  }, [code, flagCopied]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "rgba(0, 0, 0, 0.7)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Export code"
        className="relative w-full max-w-[660px] rounded-2xl overflow-hidden animate-[fadeInUp_0.3s_cubic-bezier(0.16,1,0.3,1)_both]"
        style={{
          background: "#131314",
          border: "1px solid rgba(204, 151, 255, 0.15)",
          boxShadow: "0 0 40px rgba(204, 151, 255, 0.1)",
        }}
      >
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b"
          style={{ borderColor: "rgba(72, 72, 73, 0.3)" }}
        >
          {/* Output Scope Selector */}
          <div
            className="flex items-center gap-0.5 rounded-lg p-0.5"
            style={{ background: "#201f21", border: "1px solid rgba(72, 72, 73, 0.4)" }}
          >
            {[
              { id: "body", label: "Body" },
              { id: "hero", label: "Hero UI" },
              { id: "card", label: "Card UI" },
              { id: "tailwind", label: "Tailwind" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTarget(item.id as OutputTarget)}
                className="px-2.5 py-1 rounded-md text-[11.5px] font-semibold border-none cursor-pointer transition-all duration-200"
                style={{
                  background: target === item.id ? "#cc97ff" : "transparent",
                  color: target === item.id ? "#0e0e0f" : "#999",
                }}
              >
                {item.label}
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
              {copied ? "Copied!" : "Copy Code"}
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer border-none"
              style={{ color: "#999", background: "transparent" }}
            >
              <XIcon size={18} />
            </button>
          </div>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto scrollbar-hide">
          <pre
            className="text-[12.5px] leading-[1.7] font-mono whitespace-pre-wrap break-words m-0"
            style={{ color: "#ccc" }}
          >
            {code}
          </pre>
        </div>
      </div>
    </div>
  );
}
