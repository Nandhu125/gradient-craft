"use client";

import { useState } from "react";
import type { StudioState } from "@/types/studio";
import { exportSvg, exportRaster, type RasterFormat } from "@/lib/studio-export";
import { DownloadIcon } from "@/components/ui/icons";
import { ToolbarButton } from "@/components/studio/toolbar-button";

export function ExportMenu({ state }: { state: StudioState }) {
  const [open, setOpen] = useState(false);

  const raster = async (format: RasterFormat) => {
    setOpen(false);
    try {
      await exportRaster(state, format);
    } catch {
      /* rasterization unsupported (rare browser) — no-op */
    }
  };

  const svg = async () => {
    setOpen(false);
    try {
      await exportSvg(state);
    } catch {
      /* export failed (rare) — no-op */
    }
  };

  const items = [
    { label: "PNG", onClick: () => raster("image/png") },
    { label: "WebP", onClick: () => raster("image/webp") },
    { label: "SVG", onClick: svg },
  ];

  return (
    <div className="relative">
      <ToolbarButton onClick={() => setOpen((v) => !v)}>
        <DownloadIcon size={16} />
        Export
      </ToolbarButton>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[148px] rounded-xl border border-[#484849]/40 bg-[#18171a] p-1 shadow-xl">
            {items.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[12.5px] font-medium text-[#ccc] hover:bg-[#201f21] hover:text-white transition-colors cursor-pointer"
              >
                <DownloadIcon size={14} />
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
