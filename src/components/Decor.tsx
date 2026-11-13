type DecorProps = { className?: string }

/* A small hand-drawn mark set. Thin strokes only, no fills, no colour. */

export function Sparkle({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 2.6c.58 5.1 2.3 6.82 7.4 7.4-5.1.58-6.82 2.3-7.4 7.4-.58-5.1-2.3-6.82-7.4-7.4 5.1-.58 6.82-2.3 7.4-7.4Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Squiggle({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 58 8" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M1 5.6c4-5 7.6 2 11.6-1S20.8 7.4 24.8 4.2s8 2.4 12 .4 7.6 1.6 11.6-1.4 7.2 1.4 9.6-.6"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Asterisk({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 3.4v17.2M4.6 7.7l14.8 8.6M19.4 7.7 4.6 16.3"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Cursor({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 20 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M3 2.4 17.2 12.8l-6.1.9-2.5 6.3L3 2.4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowUpRight({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M5.5 14.5 14.5 5.5M7.2 5.5h7.3v7.3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowCurve({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 44 40" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M3 4.5c17.5.6 30 8 33.5 27"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="m30 25.5 6.7 7 5.6-7.8"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Pin({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 21.2s7.1-6.4 7.1-11.3a7.1 7.1 0 1 0-14.2 0c0 4.9 7.1 11.3 7.1 11.3Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.7" r="2.5" stroke="currentColor" strokeWidth="1.15" />
    </svg>
  )
}

export function Briefcase({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="2.6" y="7.2" width="18.8" height="13" rx="2.4" stroke="currentColor" strokeWidth="1.15" />
      <path
        d="M8.6 7.2V5.6a2 2 0 0 1 2-2h2.8a2 2 0 0 1 2 2v1.6M2.6 12.4h18.8"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Book({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M3.2 4.6h5.4a3.4 3.4 0 0 1 3.4 3.4v11.6a2.6 2.6 0 0 0-2.6-2.6H3.2V4.6Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <path
        d="M20.8 4.6h-5.4a3.4 3.4 0 0 0-3.4 3.4v11.6a2.6 2.6 0 0 1 2.6-2.6h6.2V4.6Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Document({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 40 48" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M6.5 4.2h17.2l9.8 9.5v30.1H6.5V4.2Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M23.4 4.4v9.6h9.6" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path
        d="M12.6 20.6h14.6M12.6 26.4h14.6M12.6 32.2h9.4M12.6 38h11.8"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function BrowserDoodle({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 46 34" fill="none" aria-hidden="true" focusable="false">
      <rect x="1.4" y="2.2" width="43.2" height="29.6" rx="4.4" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.6 10.4h42.8" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="6.6" cy="6.4" r="0.9" fill="currentColor" />
      <circle cx="10.4" cy="6.4" r="0.9" fill="currentColor" />
      <circle cx="14.2" cy="6.4" r="0.9" fill="currentColor" />
      <path
        d="M8.2 16.6h13.2M8.2 21.2h20.4M8.2 25.8h9.6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function FolderDoodle({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 42 34" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M2.2 6.6c0-2 1.6-3.6 3.6-3.6h8.4l3.4 3.4h18.6c2 0 3.6 1.6 3.6 3.6v18.2c0 2-1.6 3.6-3.6 3.6H5.8c-2 0-3.6-1.6-3.6-3.6V6.6Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M2.4 12.4h37.2" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

export function SketchCircle({ className }: DecorProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M93 24.5c14.4 12.6 17.6 35.2 7.2 50.9-11 16.7-34.4 23.2-52.5 15.4C29 82.4 19 62 25 43.4 30.6 26.2 48 14.4 66 16.2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  )
}
