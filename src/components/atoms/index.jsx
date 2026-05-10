import React from 'react'

// ── Button ────────────────────────────────────────────────────
export function Button({ children, onClick, variant = 'primary', disabled, style = {} }) {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
      color: '#fff',
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: '#22d3ee',
      border: '1px solid #22d3ee44',
    },
    danger: {
      background: '#ef444422',
      color: '#ef4444',
      border: '1px solid #ef444444',
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
      border: '3px solid #1e2d45',
      borderTop: '3px solid #22d3ee',
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
        padding: '10px 16px',
        background: '#1c2537',
        border: '1px solid #1e2d45',
        borderRadius: 10,
        color: '#e2e8f0',
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        outline: 'none',
        transition: 'border-color 0.2s',
        ...style,
      }}
      onFocus={e => e.target.style.borderColor = '#22d3ee'}
      onBlur={e => e.target.style.borderColor = '#1e2d45'}
    />
  )
}

// ── Icon components (SVG inline) ──────────────────────────────
export function IconSearch() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  )
}

export function IconRefresh() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  )
}

export function IconArrowLeft() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  )
}
