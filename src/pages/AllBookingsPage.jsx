import React, { useEffect, useState } from 'react'
import { bookingService } from '../services/bookingService.js'
import BookingTable from '../components/organisms/BookingTable.jsx'
import { SearchBar, FilterSelect } from '../components/molecules/index.jsx'
import { Button, IconRefresh } from '../components/atoms/index.jsx'

const STATUS_OPTIONS = [
  { value: '', label: 'Semua Status' },
  { value: 'pending',   label: '⏳ Pending'   },
  { value: 'confirmed', label: '✅ Confirmed' },
  { value: 'completed', label: '🏆 Completed' },
  { value: 'cancelled', label: '❌ Cancelled' },
]

const SPORT_OPTIONS = [
  { value: '', label: 'Semua Olahraga' },
  { value: 'Badminton', label: '🏸 Badminton' },
  { value: 'Futsal',    label: '⚽ Futsal'    },
  { value: 'Basket',    label: '🏀 Basket'    },
  { value: 'Tenis',     label: '🎾 Tenis'     },
  { value: 'Voli',      label: '🏐 Voli'      },
]

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sportFilter, setSportFilter] = useState('')

  const fetchData = () => {
    setLoading(true)
    setError(null)
    bookingService.getAll()
      .then(res => {
        setBookings(res.data || [])
        setFiltered(res.data || [])
      })
      .catch(err => setError('Gagal mengambil data. Pastikan backend berjalan.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  // Filter logic
  useEffect(() => {
    let result = [...bookings]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(b =>
        b.nama_pemesan?.toLowerCase().includes(q) ||
        b.email?.toLowerCase().includes(q) ||
        b.nama_lapangan?.toLowerCase().includes(q) ||
        String(b.id).includes(q)
      )
    }
    if (statusFilter) result = result.filter(b => b.status === statusFilter)
    if (sportFilter)  result = result.filter(b => b.jenis_olahraga === sportFilter)
    setFiltered(result)
  }, [search, statusFilter, sportFilter, bookings])

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 4,
          }}>
            Semua Booking 📋
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
            Menampilkan <strong style={{ color: '#22d3ee' }}>{filtered.length}</strong> dari {bookings.length} booking
          </p>
        </div>
        <Button onClick={fetchData} variant="secondary">
          <IconRefresh /> Refresh
        </Button>
      </div>

      {/* Filters */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        padding: '20px',
        marginBottom: 20,
        display: 'grid',
        gridTemplateColumns: '1fr auto auto',
        gap: 12,
        alignItems: 'end',
      }}>
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari nama, email, lapangan, atau ID..."
        />
        <FilterSelect
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          options={STATUS_OPTIONS}
          label="Status"
        />
        <FilterSelect
          value={sportFilter}
          onChange={e => setSportFilter(e.target.value)}
          options={SPORT_OPTIONS}
          label="Olahraga"
        />
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: '#ef444422', border: '1px solid #ef444444',
          borderRadius: 12, padding: '16px 20px', marginBottom: 20,
          color: '#ef4444', fontSize: 14,
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Table */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 20,
        overflow: 'hidden',
      }}>
        <BookingTable bookings={filtered} loading={loading} />
      </div>
    </div>
  )
}
