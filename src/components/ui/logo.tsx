export function Logo({ size = 32, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
        active ? "scale-[1.05]" : "scale-100"
      }`}
    >
      <defs>
        <linearGradient id="face-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="face-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="face-right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      <g className="transition-all duration-500 ease-in-out" filter="url(#cube-shadow)">
        {/* left */}
        <path
          d="M5.5 10.5 L16 16.5 L16 28 L5.5 22 Z"
          fill="url(#face-left)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          strokeLinejoin="round"
          className={`transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
            active ? "-translate-x-[1.5px] translate-y-[0.8px]" : "translate-x-0 translate-y-0"
          }`}
        />
        {/* right */}
        <path
          d="M16 16.5 L26.5 10.5 L26.5 22 L16 28 Z"
          fill="url(#face-right)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          strokeLinejoin="round"
          className={`transition-transform duration-500 delay-[0.05s] ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
            active ? "translate-x-[1.5px] translate-y-[0.8px]" : "translate-x-0 translate-y-0"
          }`}
        />
        {/* top */}
        <path
          d="M16 4.5 L26.5 10.5 L16 16.5 L5.5 10.5 Z"
          fill="url(#face-top)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          strokeLinejoin="round"
          className={`transition-transform duration-500 delay-[0.1s] ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
            active ? "translate-x-0 -translate-y-[1.5px]" : "translate-x-0 translate-y-0"
          }`}
        />
      </g>
    </svg>
  );
}
