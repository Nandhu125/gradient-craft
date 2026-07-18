"use client";

import { useState, useEffect } from "react";
import type { StudioState } from "@/types/studio";
import { computePreviewStyle } from "@/lib/studio-css";
import {
  loadSaves,
  addSave,
  deleteSave,
  type SavedComposition,
} from "@/lib/studio-saves";
import { BookmarkIcon, XIcon } from "@/components/ui/icons";

interface Props {
  currentState: StudioState;
  onLoad: (state: StudioState) => void;
  onClose: () => void;
}

// A static (non-animated) preview style so a grid of thumbnails doesn't spin
// up dozens of running animations.
function thumbStyle(state: StudioState) {
  return computePreviewStyle({
    ...state,
    animation: { ...state.animation, enabled: false },
  });
}

export function SavedPanel({ currentState, onLoad, onClose }: Props) {
  const [saves, setSaves] = useState<SavedComposition[]>(() => loadSaves());

  const handleSaveCurrent = () => setSaves(addSave(currentState));
  const handleDelete = (id: string) => setSaves(deleteSave(id));

  // Close on Escape — expected for any modal dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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
        aria-label="Saved compositions"
        className="relative w-full max-w-[620px] rounded-2xl overflow-hidden animate-[fadeInUp_0.3s_cubic-bezier(0.16,1,0.3,1)_both]"
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
            Saved
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveCurrent}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold border-none transition-all duration-200 cursor-pointer"
              style={{ background: "#cc97ff", color: "#0e0e0f" }}
            >
              <BookmarkIcon size={14} />
              Save current
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

        {/* Grid */}
        <div className="p-5 max-h-[60vh] overflow-y-auto scrollbar-hide">
          {saves.length === 0 ? (
            <p className="text-[13px] text-center py-10" style={{ color: "#777" }}>
              No saved compositions yet. Hit &ldquo;Save current&rdquo; to keep this one.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {saves.map((s) => (
                <div key={s.id} className="group relative">
                  <button
                    onClick={() => {
                      onLoad(s.state);
                      onClose();
                    }}
                    className="block w-full h-24 rounded-xl cursor-pointer overflow-hidden transition-all duration-200 hover:scale-[1.03]"
                    style={{
                      ...thumbStyle(s.state),
                      border: "1px solid rgba(72, 72, 73, 0.4)",
                    }}
                    aria-label="Load this composition"
                    title="Load this composition"
                  />
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-md border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
                    aria-label="Delete composition"
                    title="Delete"
                  >
                    <XIcon size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
