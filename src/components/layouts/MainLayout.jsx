import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../atoms/index.jsx'

import { IconFileText } from '../atoms/index.jsx'

// Data Menu Sidebar Baru
const navItems = [
  { 
    path: '/dashboard', 
    icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>, 
    label: 'Dashboard' 
  },
  { 
    path: '/all', 
    icon: <IconFileText size={18} />, 
    label: 'Data Booking' 
  },
]

export default function MainLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* ── Sidebar ───────────────────────────────────── */}
      <aside style={{
        width: 240,
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ padding: '0 24px 28px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Baiboo</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>
            Baihaqi Booking
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-text-muted)', padding: '0 12px', marginBottom: 8 }}>
            MENU
          </div>
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#22d3ee' : '#94a3b8',
                  background: isActive ? '#22d3ee15' : 'transparent',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  marginBottom: 2,
                  borderLeft: isActive ? '3px solid #22d3ee' : '3px solid transparent',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#ffffff08' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            UTS — Pemrograman III
          </div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>Muhammad Baihaqi Siregar</div>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────── */}
      <main style={{ marginLeft: 240, flex: 1, padding: '32px', minHeight: '100vh', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 32, right: 32, zIndex: 50 }}>
          <Button onClick={() => navigate('/')} variant="secondary" style={{ padding: '8px 16px', borderRadius: 6 }}>
            Halaman Utama
          </Button>
        </div>
        <div style={{ paddingTop: 40 }}>
          {children}
        </div>
      </main>
    </div>
  )
}
