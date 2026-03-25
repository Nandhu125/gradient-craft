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
        className={`relative w-10 h-[22px] rounded-full border-none cursor-pointer transition-colors duration-200 ${
          enabled ? "bg-emerald-500" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            enabled ? "translate-x-[18px]" : "translate-x-0"
          }`}
        />
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
        <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
          {label}
        </label>
        <span className="text-[11px] text-white/50 font-mono">
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
        className="ctrl-slider"
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
      <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-[11.5px] font-medium border cursor-pointer transition-all duration-200 ${
              selected === opt.value
                ? "bg-white/15 border-white/20 text-white"
                : "bg-transparent border-white/8 text-white/40 hover:text-white/60 hover:border-white/15"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
