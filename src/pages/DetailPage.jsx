import React, { useState } from 'react'
import { bookingService } from '../services/bookingService.js'
import Badge from '../components/atoms/Badge.jsx'
import { Button, Input, Spinner, IconArrowLeft, IconAlert, IconUser, IconMapPin, IconClock, IconFileText, IconSearch } from '../components/atoms/index.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function InfoRow({ label, value, accent }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: '1px solid #1e2d4566',
    }}>
      <span style={{ fontSize: 13, color: 'var(--color-text-muted)', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: accent || 'var(--color-text)', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  )
}

function formatRupiah(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)
}
function formatDate(str) {
  if (!str) return '-'
  return new Date(str).toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}
function formatDateTime(str) {
  if (!str) return '-'
  return new Date(str).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function DetailPage() {
  const { id: paramId } = useParams()
  const navigate = useNavigate()

  const [searchId, setSearchId] = useState(paramId || '')
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const fetchById = async (targetId) => {
    const idToSearch = targetId || searchId
    if (!idToSearch) return
    setLoading(true)
    setError(null)
    setBooking(null)
    setSearched(true)
    try {
      const res = await bookingService.getById(idToSearch)
      setBooking(res.data)
    } catch {
      setError(`Booking dengan ID "${idToSearch}" tidak ditemukan.`)
    } finally {
      setLoading(false)
    }
  }

  // Auto-fetch if navigated with param ID
  useEffect(() => {
    if (paramId) fetchById(paramId)
  }, [paramId])

  return (
    <div style={{ animation: 'fadeUp 0.4s ease', maxWidth: 860, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <Button variant="secondary" onClick={() => navigate('/all')} style={{ marginBottom: 20, fontSize: 13 }}>
          <IconArrowLeft /> Kembali
        </Button>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28, fontWeight: 800,
          background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 4,
        }}>
          Cari Booking by ID
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
          Masukkan ID booking untuk melihat detail.
        </p>
      </div>

      {/* Search Form */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <Input
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            placeholder="Masukkan ID Booking (contoh: 1)"
            type="number"
            style={{ flex: 1 }}
          />
          <Button
            onClick={() => fetchById()}
            disabled={loading || !searchId}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><IconSearch size={16} /> Cari</div>
          </Button>
        </div>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 10 }}>
          Tip: Klik tombol "Detail →" dari halaman Semua Booking untuk langsung melihat detail.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <Spinner />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={{
          background: '#ef444418', border: '1px solid #ef444444',
          borderRadius: 12, padding: '20px 24px',
          color: '#ef4444', fontSize: 14, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8
        }}>
          <IconAlert size={20} /> {error}
        </div>
      )}

      {/* Detail Card */}
      {booking && !loading && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          {/* Top Bar */}
          <div style={{
            background: 'linear-gradient(135deg, #22d3ee18, #6366f118)',
            border: '1px solid #22d3ee33',
            borderRadius: '20px 20px 0 0',
            padding: '20px 28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>BOOKING ID</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36, fontWeight: 800,
                background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>#{booking.id}</div>
            </div>
            <Badge status={booking.status} />
          </div>

          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderTop: 'none',
            borderRadius: '0 0 20px 20px',
            padding: '24px 28px',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              {/* Kiri: Data Pemesan */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#22d3ee', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <IconUser size={18} /> Data Pemesan
                </h3>
                <InfoRow label="Nama"       value={booking.nama_pemesan} />
                <InfoRow label="Email"      value={booking.email} accent="#6366f1" />
                <InfoRow label="No. Telepon" value={booking.no_telepon} />
              </div>

              {/* Kanan: Detail Booking */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#22d3ee', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <IconMapPin size={18} /> Detail Lapangan
                </h3>
                <InfoRow label="Nama Lapangan"   value={booking.nama_lapangan} />
                <InfoRow label="Jenis Olahraga"  value={booking.jenis_olahraga} />
                <InfoRow label="Tanggal Main"    value={formatDate(booking.tanggal_main)} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 24, marginTop: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#22d3ee', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <IconClock size={18} /> Waktu & Pembayaran
                  </h3>
                  <InfoRow label="Jam Mulai"   value={booking.jam_mulai?.slice(0, 5)} />
                  <InfoRow label="Jam Selesai" value={booking.jam_selesai?.slice(0, 5)} />
                  <InfoRow label="Total Harga" value={formatRupiah(booking.total_harga)} accent="#10b981" />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#22d3ee', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <IconFileText size={18} /> Informasi Lain
                  </h3>
                  <InfoRow label="Catatan"    value={booking.catatan || '-'} />
                  <InfoRow label="Dibuat"     value={formatDateTime(booking.created_at)} />
                  <InfoRow label="Diupdate"   value={formatDateTime(booking.updated_at)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
