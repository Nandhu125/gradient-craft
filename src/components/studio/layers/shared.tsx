"use client";

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  displayValue?: string;
  onChange: (v: number) => void;
}

export function SliderRow({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  displayValue,
  onChange,
}: SliderRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#999" }}>
          {label}
        </label>
        <span className="text-[11px] font-mono" style={{ color: "#ccc" }}>
          {displayValue ?? `${value}${unit}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="studio-slider"
      />
    </div>
  );
}

export function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Remove"
      className="w-6 h-6 flex items-center justify-center rounded border-none cursor-pointer transition-all text-[14px] bg-transparent"
      style={{ color: "#999" }}
    >
      ×
    </button>
  );
}

export function SectionHeader({
  label,
  onAdd,
}: {
  label: string;
  onAdd?: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#999" }}>
        {label}
      </label>
      {onAdd && (
        <button
          onClick={onAdd}
          className="text-[10.5px] font-medium border-none bg-transparent cursor-pointer transition-colors"
          style={{ color: "rgba(204, 151, 255, 0.7)" }}
        >
          + Add
        </button>
      )}
    </div>
  );
}

interface ColorSwatchInputProps {
  color: string;
  onChange: (color: string) => void;
  // Studio surfaces the hex text field on two different panels (#201f21 vs
  // #18171a); the swatch is identical.
  hexBg?: string;
}

export function ColorSwatchInput({
  color,
  onChange,
  hexBg = "#201f21",
}: ColorSwatchInputProps) {
  return (
    <>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="studio-color-input !w-8 !h-8 !rounded-md"
      />
      <input
        type="text"
        value={color}
        onChange={(e) => {
          const v = e.target.value;
          if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
        }}
        className="w-[80px] rounded-md px-2 py-1.5 text-[11px] font-mono outline-none transition-colors"
        style={{
          background: hexBg,
          border: "1px solid rgba(72, 72, 73, 0.4)",
          color: "#ccc",
        }}
        maxLength={7}
      />
    </>
  );
}

interface PillGroupProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  selected: T;
  onChange: (v: T) => void;
}

export function PillGroup<T extends string>({
  label,
  options,
  selected,
  onChange,
}: PillGroupProps<T>) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#999" }}>
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            aria-pressed={selected === opt.value}
            className="px-3 py-1.5 rounded-lg text-[11.5px] font-medium border cursor-pointer transition-all duration-200"
            style={{
              background: selected === opt.value ? "rgba(204, 151, 255, 0.12)" : "transparent",
              borderColor: selected === opt.value ? "rgba(204, 151, 255, 0.3)" : "rgba(72, 72, 73, 0.4)",
              color: selected === opt.value ? "#cc97ff" : "#ccc",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
