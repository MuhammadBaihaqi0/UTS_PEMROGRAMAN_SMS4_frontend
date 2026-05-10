import React from 'react'
import { Input, IconSearch } from '../atoms/index.jsx'

// ── SearchBar ─────────────────────────────────────────────────
export function SearchBar({ value, onChange, placeholder = 'Cari...' }) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{
        position: 'absolute', left: 14, top: '50%',
        transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none',
      }}>
        <IconSearch />
      </span>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ paddingLeft: 40 }}
      />
    </div>
  )
}

// ── StatCard ──────────────────────────────────────────────────
export function StatCard({ label, value, icon, color = '#22d3ee' }) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      transition: 'transform 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: `${color}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-display)', color }}>{value}</div>
        <div style={{ fontSize: 13, color: 'var(--color-text-muted)', fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  )
}

// ── FilterSelect ──────────────────────────────────────────────
export function FilterSelect({ value, onChange, options, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && <label style={{ fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 600 }}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        style={{
          padding: '10px 14px',
          background: '#1c2537',
          border: '1px solid #1e2d45',
          borderRadius: 10,
          color: '#e2e8f0',
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
