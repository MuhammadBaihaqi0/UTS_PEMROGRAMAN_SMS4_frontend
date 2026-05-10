import React, { useEffect, useState } from 'react'
import { bookingService } from '../services/bookingService.js'
import { StatCard } from '../components/molecules/index.jsx'
import { useNavigate } from 'react-router-dom'
import { IconFileText, IconClock, IconCheckCircle, IconAward, IconCreditCard } from '../components/atoms/index.jsx'

export default function DashboardPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    bookingService.getAll()
      .then(res => setBookings(res.data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false))
  }, [])

  const stats = {
    total:     bookings.length,
    pending:   bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    revenue:   bookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + Number(b.total_harga), 0),
  }

  const recentBookings = [...bookings].slice(0, 5)

  const formatRupiah = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)
  const formatDate = str => str ? new Date(str).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          fontWeight: 800,
          background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 6,
        }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>
          Selamat datang di sistem booking lapangan olahraga.
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div style={{ color: 'var(--color-text-muted)' }}>Memuat data...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            <StatCard label="Total Booking"  value={stats.total}     icon={<IconFileText size={24} color="#22d3ee" />} color="#22d3ee" />
            <StatCard label="Pending"        value={stats.pending}   icon={<IconClock size={24} color="#f59e0b" />} color="#f59e0b" />
            <StatCard label="Confirmed"      value={stats.confirmed} icon={<IconCheckCircle size={24} color="#10b981" />} color="#10b981" />
            <StatCard label="Completed"      value={stats.completed} icon={<IconAward size={24} color="#6366f1" />} color="#6366f1" />
          </div>

          {/* Revenue Card */}
          <div style={{
            background: 'linear-gradient(135deg, #22d3ee18, #6366f118)',
            border: '1px solid #22d3ee33',
            borderRadius: 20,
            padding: '24px 28px',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 6 }}>TOTAL PENDAPATAN</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#10b981' }}>
                {formatRupiah(stats.revenue)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconCreditCard size={56} color="#10b981" />
            </div>
          </div>

          {/* Recent Bookings */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 20,
            padding: 24,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>Booking Terbaru</h2>
              <button
                onClick={() => navigate('/all')}
                style={{
                  padding: '7px 16px', background: '#22d3ee22',
                  color: '#22d3ee', border: '1px solid #22d3ee33',
                  borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Lihat Semua →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentBookings.map(b => (
                <div key={b.id}
                  onClick={() => navigate(`/detail/${b.id}`)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 16px',
                    background: '#0d1526',
                    borderRadius: 12,
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#22d3ee44'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: '#22d3ee22',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontWeight: 800, color: '#22d3ee', fontSize: 14,
                    }}>#{b.id}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{b.nama_pemesan}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                        {b.nama_lapangan} · {b.jenis_olahraga} · {formatDate(b.tanggal_main)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontWeight: 700, color: '#10b981', fontSize: 14 }}>{formatRupiah(b.total_harga)}</span>
                    <span style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                      background: b.status === 'confirmed' ? '#10b98122' : b.status === 'pending' ? '#f59e0b22' : b.status === 'cancelled' ? '#ef444422' : '#6366f122',
                      color: b.status === 'confirmed' ? '#10b981' : b.status === 'pending' ? '#f59e0b' : b.status === 'cancelled' ? '#ef4444' : '#6366f1',
                    }}>{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
