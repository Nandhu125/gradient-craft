import type { ButtonHTMLAttributes } from "react";

type Variant = "solid" | "ghost";

// The two repeated Studio-toolbar button skins. `solid` is the raised dark
// chip (View CSS / Export / Share); `ghost` is the transparent outline
// (Reset / Saved). Display (`flex` vs `hidden sm:flex`) stays with the caller.
const VARIANTS: Record<Variant, string> = {
  solid:
    "px-3.5 bg-[#201f21] hover:bg-[#2a292b] text-[#ccc] hover:text-white border border-[#484849]/40",
  ghost:
    "px-3 bg-transparent hover:bg-[#201f21] text-[#999] hover:text-[#ccc] border border-[#484849]/30",
};

const BASE =
  "items-center gap-1.5 py-2 rounded-xl text-[12.5px] font-medium transition-all duration-200 cursor-pointer";

export function ToolbarButton({
  variant = "solid",
  className = "flex",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={`${className} ${BASE} ${VARIANTS[variant]}`} {...props}>
      {children}
    </button>
  );
}
