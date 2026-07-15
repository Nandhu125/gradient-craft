import type { ReactNode } from "react";

function Ic({ children, size = 18, className }: { children: ReactNode; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function CopyIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </Ic>
  );
}

export function ShareIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </Ic>
  );
}

export function DownloadIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </Ic>
  );
}

export function CheckIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <polyline points="20 6 9 17 4 12" />
    </Ic>
  );
}

export function XIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Ic>
  );
}

export function SearchIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Ic>
  );
}

export function ArrowDownIcon({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </Ic>
  );
}

export function ArrowUpIcon({ size = 15, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </Ic>
  );
}

export function GitHubIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function XSocialIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SurpriseIcon({ size = 15, style, className }: { size?: number; style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </svg>
  );
}

export function ControlsIcon({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <circle cx="4" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="10" r="2" fill="currentColor" />
      <circle cx="20" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </Ic>
  );
}

export function HeartIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Ic>
  );
}

export function RefreshIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </Ic>
  );
}

export function CodeIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Ic>
  );
}

export function ChevronDownIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <polyline points="6 9 12 15 18 9" />
    </Ic>
  );
}

export function EyeIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </Ic>
  );
}

export function EyeOffIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </Ic>
  );
}

export function PaletteIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </Ic>
  );
}

export function GradientIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3 A9 9 0 0 0 12 21 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GridIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </Ic>
  );
}

export function GrainIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="5" cy="6" r="1.2" /><circle cx="12" cy="4" r="1.2" /><circle cx="19" cy="7" r="1.2" />
      <circle cx="8" cy="11" r="1.2" /><circle cx="16" cy="12" r="1.2" /><circle cx="4" cy="16" r="1.2" />
      <circle cx="12" cy="18" r="1.2" /><circle cx="20" cy="17" r="1.2" /><circle cx="11" cy="12" r="1.2" />
    </svg>
  );
}

export function AnimationIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LayersIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <Ic size={size} className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </Ic>
  );
}
