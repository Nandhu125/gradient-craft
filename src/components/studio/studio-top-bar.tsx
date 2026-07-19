"use client";

import type { ReactNode } from "react";
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
import { ToolbarButton } from "@/components/studio/toolbar-button";

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
          <NavLink href="/">Home</NavLink>
          <NavLink href="/templates">Templates</NavLink>
          <span className="text-[13px] font-medium text-white">Studio</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <ToolbarButton variant="ghost" className="hidden sm:flex" onClick={onReset}>
          <RefreshIcon size={16} />
          Reset
        </ToolbarButton>
        <ToolbarButton
          variant="ghost"
          onClick={onShowSaved}
          aria-label="Saved compositions"
        >
          <BookmarkIcon size={16} />
          <span className="hidden sm:inline">Saved</span>
        </ToolbarButton>
        <ToolbarButton onClick={onShowCode}>
          <CodeIcon size={16} />
          View CSS
        </ToolbarButton>
        <ExportMenu state={state} />
        <ToolbarButton onClick={onShare}>
          <ActionLabel
            active={shared}
            activeLabel="Link copied!"
            idleIcon={<ShareIcon size={16} />}
            idleLabel="Share"
          />
        </ToolbarButton>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-semibold border-none transition-all duration-200 cursor-pointer"
          style={{
            background: "#cc97ff",
            color: "#0e0e0f",
            boxShadow: "0 0 20px rgba(204, 151, 255, 0.3)",
          }}
        >
          <ActionLabel
            active={copied}
            activeLabel="Copied!"
            idleIcon={<CopyIcon size={16} />}
            idleLabel="Copy CSS"
          />
        </button>
      </div>
    </nav>
  );
}

// Shared icon+label body for the Share / Copy buttons: swaps to a check mark
// and confirmation text once the action fires.
function ActionLabel({
  active,
  activeLabel,
  idleIcon,
  idleLabel,
}: {
  active: boolean;
  activeLabel: string;
  idleIcon: ReactNode;
  idleLabel: string;
}) {
  return active ? (
    <>
      <CheckIcon size={16} />
      {activeLabel}
    </>
  ) : (
    <>
      {idleIcon}
      {idleLabel}
    </>
  );
}

// The two secondary page links in the toolbar share one skin.
function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[13px] font-medium text-[#ccc] hover:text-white no-underline transition-colors"
    >
      {children}
    </Link>
  );
}
