import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, IconMapPin, IconStar } from '../components/atoms/index.jsx';
import BookingModal from '../components/organisms/BookingModal.jsx';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');
  const tabs = ['Semua', 'Futsal', 'Basket', 'Badminton', 'Tenis'];

  // State untuk search widget
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');

  // State untuk modal booking
  const [showModal, setShowModal] = useState(false);
  const [prefill, setPrefill] = useState({});

  const topFields = [
    { id: 1, name: 'Arena Futsal Bandung', sport: 'Futsal', loc: 'Bandung', price: 150000, img: 'https://whatsnewindonesia.com/sites/default/files/inline-images/Futsal%20Shakti%20Taridi.png' },
    { id: 2, name: 'Gor Basket Bandung', sport: 'Basket', loc: 'Bandung', price: 200000, img: 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?q=80&w=400&auto=format&fit=crop' },
    { id: 3, name: 'Badminton Center Bandung', sport: 'Badminton', loc: 'Bandung', price: 100000, img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=400&auto=format&fit=crop' },
    { id: 4, name: 'Tenis Court Bandung', sport: 'Tenis', loc: 'Bandung', price: 250000, img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400&auto=format&fit=crop' },
  ];

  const handleSearch = () => {
    setPrefill({ namaLapangan: searchName, tanggalMain: searchDate, jamMulai: searchTime, jenisOlahraga: activeTab === 'Semua' ? '' : activeTab });
    setShowModal(true);
  };

  const handleCardClick = (field) => {
    setPrefill({ namaLapangan: field.name, jenisOlahraga: field.sport, hargaPerJam: field.price });
    setShowModal(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', fontFamily: 'var(--font-body)' }}>
      {/* ── Navbar ──────────────────────────────────────── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 40px', background: '#fff', borderBottom: '1px solid var(--color-border)',
        position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Agoda-like colorful dots */}
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff567d' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffb300' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#00c389' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#5392f9' }}></div>
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--color-text)',
            letterSpacing: '-0.02em'
          }}>Baiboo</div>
        </div>
        
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Button onClick={() => navigate('/dashboard')} variant="secondary" style={{ padding: '8px 16px', borderRadius: 6 }}>
            Dashboard Admin
          </Button>
        </div>
      </nav>

      {/* ── Hero Section & Search Widget ────────────────── */}
      <div style={{
        position: 'relative',
        height: '55vh',
        minHeight: '450px',
        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url("https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1920&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 800, color: '#fff', marginBottom: 30, textShadow: '0 2px 10px rgba(0,0,0,0.3)', textAlign: 'center' }}>
          Temukan dan Booking Lapangan Olahraga
        </h1>

        {/* Floating Search Widget (Mirip Agoda) */}
        <div style={{
          background: '#fff',
          padding: '24px',
          borderRadius: 16,
          boxShadow: 'var(--shadow-widget)',
          width: '90%',
          maxWidth: '1000px',
          border: '1px solid var(--color-border)',
          animation: 'fadeUp 0.6s ease'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 24px', borderRadius: 20, cursor: 'pointer',
                  fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-body)',
                  background: activeTab === tab ? '#e8f0fe' : '#f5f7fa',
                  color: activeTab === tab ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  border: activeTab === tab ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                  transition: 'all 0.2s', whiteSpace: 'nowrap'
                }}
              >{tab}</button>
            ))}
          </div>

          {/* Search Inputs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ position: 'relative', flex: '1 1 250px', minHeight: 56 }}>
              <Input placeholder="Cari nama lapangan atau lokasi..." value={searchName} onChange={e => setSearchName(e.target.value)} style={{ paddingLeft: 44, height: '100%', fontSize: 16 }} />
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                <IconMapPin size={20} color="var(--color-text-dim)" />
              </span>
            </div>
            <div style={{ position: 'relative', flex: '1 1 140px', minHeight: 56 }}>
              <Input type="date" value={searchDate} onChange={e => setSearchDate(e.target.value)} style={{ height: '100%', fontSize: 15 }} />
            </div>
            <div style={{ position: 'relative', flex: '1 1 140px', minHeight: 56 }}>
              <Input type="time" value={searchTime} onChange={e => setSearchTime(e.target.value)} style={{ height: '100%', fontSize: 15 }} />
            </div>
            <Button onClick={handleSearch} style={{ minHeight: 56, padding: '0 40px', fontSize: 18, borderRadius: 8, flex: '1 1 100%' }}>
              CARI
            </Button>
          </div>
        </div>
      </div>

      {/* ── Top Destinations / Lapangan Rekomendasi ─────── */}
      <div className="container" style={{ padding: '60px 24px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 24, color: 'var(--color-text)' }}>
          Rekomendasi Lapangan Olahraga
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {topFields.map(field => (
            <div key={field.id} style={{
              background: '#fff', borderRadius: 12, overflow: 'hidden',
              cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
              border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)',
              display: 'flex', flexDirection: 'column'
            }}
            onClick={() => handleCardClick(field)}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
            >
              <div style={{ position: 'relative' }}>
                <img src={field.img} alt={field.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                  {field.sport}
                </div>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.3 }}>{field.name}</div>
                </div>
                
                <div style={{ fontSize: 13, color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                  <IconMapPin size={14} /> <span style={{ textDecoration: 'underline' }}>{field.loc}</span>
                </div>
                
                <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Harga Mulai</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-danger)' }}>
                    Rp {field.price.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>per jam</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Booking Modal ──────────────────────────────── */}
      {showModal && (
        <BookingModal prefill={prefill} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}