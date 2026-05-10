import React, { useState, useEffect } from 'react'
import { bookingService } from '../services/bookingService.js'
import { Button, Input, Spinner, IconArrowLeft, IconAlert, IconUser, IconMapPin, IconClock, IconFileText, IconSearch } from '../components/atoms/index.jsx'
import { useNavigate, useParams } from 'react-router-dom'

function InfoRow({ label, value, accent }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 0', borderBottom: '1px solid #1e2d4566',
    }}>
      <span style={{ fontSize: 13, color: 'var(--color-text-muted)', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: accent || 'var(--color-text)', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  )
}

function EditRow({ label, value, onChange, type = "text" }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1e2d4566' }}>
      <span style={{ fontSize: 13, color: 'var(--color-text-muted)', fontWeight: 500 }}>{label}</span>
      <Input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: '60%', padding: '6px 10px', fontSize: 13, minHeight: 'auto' }} />
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
  
  // CRUD states
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({})

  const fetchById = async (targetId) => {
    const idToSearch = targetId || searchId
    if (!idToSearch) return
    setLoading(true)
    setError(null)
    setBooking(null)
    setIsEditing(false)
    try {
      const res = await bookingService.getById(idToSearch)
      setBooking(res.data)
      setEditForm(res.data)
    } catch {
      setError(`Booking dengan ID "${idToSearch}" tidak ditemukan.`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (paramId) fetchById(paramId)
  }, [paramId])

  const handleDelete = async () => {
    if (!window.confirm('Yakin ingin menghapus booking ini?')) return
    setLoading(true)
    try {
      await bookingService.delete(booking.id)
      navigate('/all')
    } catch (err) {
      setError('Gagal menghapus booking.')
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const res = await bookingService.update(booking.id, editForm)
      setBooking(res.data)
      setEditForm(res.data)
      setIsEditing(false)
    } catch (err) {
      setError('Gagal mengupdate booking.')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const setForm = (key, val) => setEditForm(p => ({ ...p, [key]: val }))

  return (
    <div style={{ animation: 'fadeUp 0.4s ease', maxWidth: 860, margin: '0 auto' }}>
      {/* Header */}
      <div className="no-print" style={{ marginBottom: 28 }}>
        <Button variant="secondary" onClick={() => navigate('/all')} style={{ marginBottom: 20, fontSize: 13 }}>
          <IconArrowLeft /> Kembali
        </Button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>
          Detail & Kelola Booking
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
          Kelola detail transaksi atau cetak bukti booking.
        </p>
      </div>

      {/* Search Form */}
      <div className="no-print" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <Input value={searchId} onChange={e => setSearchId(e.target.value)} placeholder="Masukkan ID Booking (contoh: 1)" type="number" style={{ flex: 1 }} />
          <Button onClick={() => fetchById()} disabled={loading || !searchId}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><IconSearch size={16} /> Cari</div>
          </Button>
        </div>
      </div>

      {loading && (
        <div className="no-print" style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <Spinner />
        </div>
      )}

      {error && !loading && (
        <div className="no-print" style={{ background: '#ef444418', border: '1px solid #ef444444', borderRadius: 12, padding: '20px 24px', color: '#ef4444', fontSize: 14, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <IconAlert size={20} /> {error}
        </div>
      )}

      {/* Detail Card */}
      {booking && !loading && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          {/* Top Bar */}
          <div style={{ background: 'linear-gradient(135deg, #22d3ee18, #6366f118)', border: '1px solid #22d3ee33', borderRadius: '20px 20px 0 0', padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>BOOKING ID</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, background: 'linear-gradient(135deg, #22d3ee, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                #{booking.id}
              </div>
            </div>
            
            <div className="no-print" style={{ display: 'flex', gap: 8 }}>
              {isEditing ? (
                <>
                  <Button variant="secondary" onClick={() => { setIsEditing(false); setEditForm(booking) }} style={{ padding: '6px 12px', fontSize: 13 }}>Batal</Button>
                  <Button onClick={handleUpdate} style={{ padding: '6px 12px', fontSize: 13 }}>Simpan</Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" onClick={() => setIsEditing(true)} style={{ padding: '6px 12px', fontSize: 13, background: '#e0e7ff', color: '#4f46e5', borderColor: '#c7d2fe' }}>✏️ Edit</Button>
                  <Button variant="danger" onClick={handleDelete} style={{ padding: '6px 12px', fontSize: 13, background: '#fee2e2', color: '#dc2626', borderColor: '#fca5a5' }}>🗑️ Hapus</Button>
                  <Button onClick={handlePrint} style={{ padding: '6px 12px', fontSize: 13, background: '#dcfce7', color: '#16a34a', borderColor: '#86efac' }}>🖨️ Cetak Bukti</Button>
                </>
              )}
            </div>
          </div>

          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderTop: 'none', borderRadius: '0 0 20px 20px', padding: '24px 28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#22d3ee', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <IconUser size={18} /> Data Pemesan
                </h3>
                {isEditing ? (
                  <>
                    <EditRow label="Nama" value={editForm.nama_pemesan} onChange={v => setForm('nama_pemesan', v)} />
                    <EditRow label="Email" value={editForm.email} onChange={v => setForm('email', v)} type="email" />
                    <EditRow label="No. Telepon" value={editForm.no_telepon} onChange={v => setForm('no_telepon', v)} />
                  </>
                ) : (
                  <>
                    <InfoRow label="Nama" value={booking.nama_pemesan} />
                    <InfoRow label="Email" value={booking.email} accent="#6366f1" />
                    <InfoRow label="No. Telepon" value={booking.no_telepon} />
                  </>
                )}
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#22d3ee', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <IconMapPin size={18} /> Detail Lapangan
                </h3>
                {isEditing ? (
                  <>
                    <EditRow label="Nama Lapangan" value={editForm.nama_lapangan} onChange={v => setForm('nama_lapangan', v)} />
                    <EditRow label="Jenis Olahraga" value={editForm.jenis_olahraga} onChange={v => setForm('jenis_olahraga', v)} />
                    <EditRow label="Tanggal Main" value={editForm.tanggal_main} onChange={v => setForm('tanggal_main', v)} type="date" />
                  </>
                ) : (
                  <>
                    <InfoRow label="Nama Lapangan" value={booking.nama_lapangan} />
                    <InfoRow label="Jenis Olahraga" value={booking.jenis_olahraga} />
                    <InfoRow label="Tanggal Main" value={formatDate(booking.tanggal_main)} />
                  </>
                )}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 24, marginTop: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#22d3ee', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <IconClock size={18} /> Waktu & Pembayaran
                  </h3>
                  {isEditing ? (
                    <>
                      <EditRow label="Jam Mulai" value={editForm.jam_mulai} onChange={v => setForm('jam_mulai', v)} type="time" />
                      <EditRow label="Jam Selesai" value={editForm.jam_selesai} onChange={v => setForm('jam_selesai', v)} type="time" />
                      <EditRow label="Total Harga" value={editForm.total_harga} onChange={v => setForm('total_harga', Number(v))} type="number" />
                    </>
                  ) : (
                    <>
                      <InfoRow label="Jam Mulai" value={booking.jam_mulai?.slice(0, 5)} />
                      <InfoRow label="Jam Selesai" value={booking.jam_selesai?.slice(0, 5)} />
                      <InfoRow label="Total Harga" value={formatRupiah(booking.total_harga)} accent="#10b981" />
                    </>
                  )}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#22d3ee', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <IconFileText size={18} /> Informasi Lain
                  </h3>
                  {isEditing ? (
                    <>
                      <EditRow label="Catatan" value={editForm.catatan || ''} onChange={v => setForm('catatan', v)} />
                    </>
                  ) : (
                    <>
                      <InfoRow label="Catatan" value={booking.catatan || '-'} />
                      <InfoRow label="Dibuat" value={formatDateTime(booking.created_at)} />
                      <InfoRow label="Diupdate" value={formatDateTime(booking.updated_at)} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
