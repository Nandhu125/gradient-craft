"use client";

import Link from "next/link";
import type { StudioState } from "@/types/studio";
import { Logo } from "@/components/ui/logo";
import {
  RefreshIcon,
  CodeIcon,
  CheckIcon,
  CopyIcon,
  ShareIcon,
  BookmarkIcon,
} from "@/components/ui/icons";
import { ExportMenu } from "@/components/studio/export-menu";

interface Props {
  state: StudioState;
  copied: boolean;
  shared: boolean;
  onReset: () => void;
  onShowSaved: () => void;
  onShowCode: () => void;
  onShare: () => void;
  onCopy: () => void;
}

// Studio's top toolbar: brand + page nav on the left, the composition actions
// (reset, saved, view CSS, export, share, copy) on the right.
export function StudioTopBar({
  state,
  copied,
  shared,
  onReset,
  onShowSaved,
  onShowCode,
  onShare,
  onCopy,
}: Props) {
  return (
    <nav className="flex items-center justify-between px-5 py-3 border-b border-[#484849]/40 bg-[#0e0e0f]/80 backdrop-blur-xl z-50 shrink-0">
      <div className="flex items-center gap-6">
        <Link href="/" aria-label="GradientCraft home" className="flex items-center gap-2.5 no-underline">
          <Logo size={26} active />
          <span className="font-mono text-[14.5px] font-extrabold tracking-[-0.03em] text-white hidden sm:block">
            GradientCraft
          </span>
        </Link>
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/"
            className="text-[13px] font-medium text-[#ccc] hover:text-white no-underline transition-colors"
          >
            Home
          </Link>
          <Link
            href="/templates"
            className="text-[13px] font-medium text-[#ccc] hover:text-white no-underline transition-colors"
          >
            Templates
          </Link>
          <span className="text-[13px] font-medium text-white">Studio</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onReset}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12.5px] font-medium bg-transparent hover:bg-[#201f21] text-[#999] hover:text-[#ccc] border border-[#484849]/30 transition-all duration-200 cursor-pointer"
        >
          <RefreshIcon size={16} />
          Reset
        </button>
        <button
          onClick={onShowSaved}
          aria-label="Saved compositions"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12.5px] font-medium bg-transparent hover:bg-[#201f21] text-[#999] hover:text-[#ccc] border border-[#484849]/30 transition-all duration-200 cursor-pointer"
        >
          <BookmarkIcon size={16} />
          <span className="hidden sm:inline">Saved</span>
        </button>
        <button
          onClick={onShowCode}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-medium bg-[#201f21] hover:bg-[#2a292b] text-[#ccc] hover:text-white border border-[#484849]/40 transition-all duration-200 cursor-pointer"
        >
          <CodeIcon size={16} />
          View CSS
        </button>
        <ExportMenu state={state} />
        <button
          onClick={onShare}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-medium bg-[#201f21] hover:bg-[#2a292b] text-[#ccc] hover:text-white border border-[#484849]/40 transition-all duration-200 cursor-pointer"
        >
          {shared ? (
            <>
              <CheckIcon size={16} />
              Link copied!
            </>
          ) : (
            <>
              <ShareIcon size={16} />
              Share
            </>
          )}
        </button>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-semibold border-none transition-all duration-200 cursor-pointer"
          style={{
            background: "#cc97ff",
            color: "#0e0e0f",
            boxShadow: "0 0 20px rgba(204, 151, 255, 0.3)",
          }}
        >
          {copied ? (
            <>
              <CheckIcon size={16} />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon size={16} />
              Copy CSS
            </>
          )}
        </button>
      </div>
    </nav>
  );
}
