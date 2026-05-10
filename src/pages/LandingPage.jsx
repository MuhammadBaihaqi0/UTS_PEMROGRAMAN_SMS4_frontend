import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, IconSearch } from '../components/atoms/index.jsx';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');
  const tabs = ['Semua', 'Futsal', 'Basket', 'Badminton', 'Tenis'];

  const topFields = [
    { id: 1, name: 'Arena Futsal Jakarta', loc: 'Jakarta Selatan', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop' },
    { id: 2, name: 'Gor Basket Bandung', loc: 'Bandung', img: 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?q=80&w=400&auto=format&fit=crop' },
    { id: 3, name: 'Badminton Center SBY', loc: 'Surabaya', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=400&auto=format&fit=crop' },
    { id: 4, name: 'Tenis Court Bali', loc: 'Denpasar', img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', fontFamily: 'var(--font-body)' }}>
      {/* ── Navbar ──────────────────────────────────────── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)',
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800,
          background: 'linear-gradient(135deg, #22d3ee, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>SportBook</div>
        
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', fontWeight: 600, color: 'var(--color-text)' }}>
          <span style={{ cursor: 'pointer' }}>Beranda</span>
          <span style={{ cursor: 'pointer' }}>Promo</span>
          <span style={{ cursor: 'pointer' }}>Bantuan</span>
          <Button onClick={() => navigate('/dashboard')} variant="secondary" style={{ padding: '8px 16px' }}>
            Dashboard Admin
          </Button>
        </div>
      </nav>

      {/* ── Hero Section & Search Widget ────────────────── */}
      <div style={{
        position: 'relative',
        height: '60vh',
        minHeight: '450px',
        backgroundImage: 'linear-gradient(to bottom, rgba(10, 15, 30, 0.3), var(--color-bg)), url("https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1920&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 800, color: '#fff', marginBottom: 30, textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
          TEMUKAN LAPANGAN TERBAIK UNTUKMU
        </h1>

        {/* Floating Search Widget (Mirip Agoda) */}
        <div style={{
          background: 'var(--color-surface)',
          padding: '8px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          width: '90%',
          maxWidth: '900px',
          border: '1px solid var(--color-border)',
          animation: 'fadeUp 0.6s ease'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, padding: '10px 16px', borderBottom: '1px solid var(--color-border)', marginBottom: 16 }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 20px', borderRadius: 30, border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-body)',
                  background: activeTab === tab ? '#22d3ee22' : 'transparent',
                  color: activeTab === tab ? '#22d3ee' : 'var(--color-text-muted)',
                  border: activeTab === tab ? '1px solid #22d3ee44' : '1px solid transparent',
                  transition: 'all 0.2s'
                }}
              >{tab}</button>
            ))}
          </div>

          {/* Search Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 12, padding: '0 16px 16px' }}>
            <div style={{ position: 'relative' }}>
              <Input placeholder="Cari nama lapangan atau lokasi..." style={{ paddingLeft: 40, height: '100%' }} />
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>📍</span>
            </div>
            <Input type="date" style={{ height: '100%' }} />
            <Input type="time" style={{ height: '100%' }} />
            <Button style={{ height: '100%', padding: '0 32px', fontSize: 16 }}>
              CARI
            </Button>
          </div>
        </div>
      </div>

      {/* ── Top Destinations / Lapangan Rekomendasi ─────── */}
      <div className="container" style={{ padding: '60px 24px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
          Rekomendasi Lapangan Olahraga
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
          {topFields.map(field => (
            <div key={field.id} style={{
              background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', overflow: 'hidden',
              cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
              border: '1px solid var(--color-border)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <img src={field.img} alt={field.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>{field.name}</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  📍 {field.loc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}