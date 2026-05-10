import React from 'react'

// ── Button ────────────────────────────────────────────────────
export function Button({ children, onClick, variant = 'primary', disabled, style = {} }) {
  const variants = {
    primary: {
      background: 'var(--color-accent)', // Agoda Blue
      color: '#fff',
      border: 'none',
      boxShadow: '0 4px 10px rgba(83, 146, 249, 0.3)',
    },
    secondary: {
      background: '#fff',
      color: 'var(--color-accent)',
      border: '1px solid var(--color-accent)',
    },
    danger: {
      background: 'var(--color-danger)',
      color: '#fff',
      border: 'none',
      boxShadow: '0 4px 10px rgba(225, 45, 45, 0.3)',
    },
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 20px',
        borderRadius: 10,
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 14,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s',
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  )
}

// ── Spinner ───────────────────────────────────────────────────
export function Spinner({ size = 32 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      border: '3px solid var(--color-border)',
      borderTop: '3px solid var(--color-accent)',
      animation: 'spin 0.8s linear infinite',
    }} />
  )
}

// ── Input ─────────────────────────────────────────────────────
export function Input({ value, onChange, placeholder, type = 'text', style = {} }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '12px 16px',
        background: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        color: 'var(--color-text)',
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        outline: 'none',
        transition: 'border-color 0.2s',
        ...style,
      }}
      onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
      onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
    />
  )
}

// ── Icon components (SVG inline) ──────────────────────────────
const SvgBase = ({ children, size = 18, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    {children}
  </svg>
);

export const IconSearch = (p) => <SvgBase {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></SvgBase>;
export const IconRefresh = (p) => <SvgBase {...p}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></SvgBase>;
export const IconArrowLeft = (p) => <SvgBase {...p}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></SvgBase>;

// New Professional Icons to replace Emojis
export const IconMapPin = (p) => <SvgBase {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></SvgBase>;
export const IconCalendar = (p) => <SvgBase {...p}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></SvgBase>;
export const IconClock = (p) => <SvgBase {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></SvgBase>;
export const IconUser = (p) => <SvgBase {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></SvgBase>;
export const IconMail = (p) => <SvgBase {...p}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></SvgBase>;
export const IconPhone = (p) => <SvgBase {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></SvgBase>;
export const IconCheckCircle = (p) => <SvgBase {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></SvgBase>;
export const IconInfo = (p) => <SvgBase {...p}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></SvgBase>;
export const IconAlert = (p) => <SvgBase {...p}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></SvgBase>;
export const IconPrinter = (p) => <SvgBase {...p}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></SvgBase>;
export const IconFileText = (p) => <SvgBase {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></SvgBase>;
export const IconAward = (p) => <SvgBase {...p}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></SvgBase>;
export const IconStadium = (p) => <SvgBase {...p}><path d="M3 10c0-3.87 4-7 9-7s9 3.13 9 7"/><path d="M22 14v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4"/><path d="M12 14v6"/><path d="M7 14v6"/><path d="M17 14v6"/></SvgBase>;
export const IconCreditCard = (p) => <SvgBase {...p}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></SvgBase>;
export const IconStar = (p) => <SvgBase {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></SvgBase>;

