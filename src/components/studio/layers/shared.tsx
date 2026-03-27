"use client";

interface LayerToggleProps {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}

export function LayerToggle({ label, enabled, onToggle }: LayerToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] font-semibold text-white/90">{label}</span>
      <button
        onClick={onToggle}
        className="studio-toggle"
        data-on={enabled ? "true" : "false"}
      >
        <span className="studio-toggle-knob" />
      </button>
    </div>
  );
}

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
        <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#767576" }}>
          {label}
        </label>
        <span className="text-[11px] font-mono" style={{ color: "#adaaab" }}>
          {displayValue ?? `${value}${unit}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="studio-slider"
      />
    </div>
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
      <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#767576" }}>
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="px-3 py-1.5 rounded-lg text-[11.5px] font-medium border cursor-pointer transition-all duration-200"
            style={{
              background: selected === opt.value ? "rgba(204, 151, 255, 0.12)" : "transparent",
              borderColor: selected === opt.value ? "rgba(204, 151, 255, 0.3)" : "rgba(72, 72, 73, 0.4)",
              color: selected === opt.value ? "#cc97ff" : "#adaaab",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
