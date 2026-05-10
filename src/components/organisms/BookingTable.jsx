import React from 'react'
import Badge from '../atoms/Badge.jsx'
import { useNavigate } from 'react-router-dom'

function formatRupiah(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)
}

function formatDate(str) {
  if (!str) return '-'
  return new Date(str).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function BookingTable({ bookings, loading }) {
  const navigate = useNavigate()

  const thStyle = {
    padding: '14px 16px',
    textAlign: 'left',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    borderBottom: '1px solid var(--color-border)',
    whiteSpace: 'nowrap',
  }

  const tdStyle = {
    padding: '14px 16px',
    fontSize: 14,
    color: 'var(--color-text)',
    borderBottom: '1px solid #1e2d4566',
    verticalAlign: 'middle',
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <div style={{
          width: 40, height: 40,
          borderRadius: '50%',
          border: '3px solid #1e2d45',
          borderTop: '3px solid #22d3ee',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    )
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏟️</div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Tidak ada data booking</div>
      </div>
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#0d1526' }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Nama Pemesan</th>
            <th style={thStyle}>Lapangan</th>
            <th style={thStyle}>Olahraga</th>
            <th style={thStyle}>Tanggal Main</th>
            <th style={thStyle}>Waktu</th>
            <th style={thStyle}>Total Harga</th>
            <th style={thStyle}>Dibuat</th>
            <th style={{ ...thStyle, textAlign: 'center' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr
              key={b.id}
              style={{
                background: i % 2 === 0 ? 'transparent' : '#0d152644',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#22d3ee0a'}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : '#0d152644'}
            >
              <td style={{ ...tdStyle, fontFamily: 'var(--font-display)', color: '#22d3ee', fontWeight: 700 }}>
                #{b.id}
              </td>
              <td style={tdStyle}>
                <div style={{ fontWeight: 600 }}>{b.nama_pemesan}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{b.email}</div>
              </td>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{b.nama_lapangan}</td>
              <td style={tdStyle}>
                <span style={{
                  padding: '3px 10px', borderRadius: 6,
                  background: '#6366f122', color: '#818cf8',
                  fontSize: 12, fontWeight: 600,
                }}>{b.jenis_olahraga}</span>
              </td>
              <td style={tdStyle}>{formatDate(b.tanggal_main)}</td>
              <td style={{ ...tdStyle, whiteSpace: 'nowrap', color: '#94a3b8' }}>
                {b.jam_mulai?.slice(0, 5)} – {b.jam_selesai?.slice(0, 5)}
              </td>
              <td style={{ ...tdStyle, fontWeight: 700, color: '#10b981' }}>
                {formatRupiah(b.total_harga)}
              </td>
              <td style={{ ...tdStyle, fontSize: 12, color: 'var(--color-text-muted)' }}>
                {formatDate(b.created_at)}
              </td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>
                <button
                  onClick={() => navigate(`/detail/${b.id}`)}
                  style={{
                    padding: '6px 14px',
                    background: '#22d3ee22',
                    color: '#22d3ee',
                    border: '1px solid #22d3ee44',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={e => { e.target.style.background = '#22d3ee'; e.target.style.color = '#0a0f1e' }}
                  onMouseLeave={e => { e.target.style.background = '#22d3ee22'; e.target.style.color = '#22d3ee' }}
                >
                  Detail →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
