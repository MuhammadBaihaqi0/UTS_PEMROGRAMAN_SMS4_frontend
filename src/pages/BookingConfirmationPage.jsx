import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, IconMapPin, IconAward, IconCalendar, IconClock, IconUser, IconMail, IconPhone, IconCheckCircle, IconFileText, IconInfo, IconPrinter, IconAlert } from '../components/atoms/index.jsx';

const API = 'http://localhost:3000/api/v1';

export default function BookingConfirmationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API}/bookings/${id}`)
      .then(res => setBooking(res.data.data))
      .catch(() => setError('Booking tidak ditemukan.'))
      .finally(() => setLoading(false));
  }, [id]);

  const formatRp = n => 'Rp ' + Number(n).toLocaleString('id-ID');

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
      Memuat data booking...
    </div>
  );

  if (error || !booking) return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <IconAlert size={64} color="#ef4444" />
      <div style={{ color: '#ef4444', fontSize: 18, fontWeight: 700 }}>{error || 'Data tidak ditemukan'}</div>
      <Button onClick={() => navigate('/')}>Kembali ke Beranda</Button>
    </div>
  );

  const confirmCode = `SB-${String(booking.id).padStart(6, '0')}`;


  const infoSections = [
    {
      title: 'Detail Lapangan',
      rows: [
        { icon: <IconMapPin size={24} color="var(--color-text-dim)" />, label: 'Nama Lapangan', value: booking.nama_lapangan },
        { icon: <IconAward size={24} color="var(--color-text-dim)" />, label: 'Jenis Olahraga', value: booking.jenis_olahraga },
      ]
    },
    {
      title: 'Jadwal Bermain',
      rows: [
        { icon: <IconCalendar size={24} color="var(--color-text-dim)" />, label: 'Tanggal', value: booking.tanggal_main },
        { icon: <IconClock size={24} color="var(--color-text-dim)" />, label: 'Jam Mulai', value: booking.jam_mulai },
        { icon: <IconClock size={24} color="var(--color-text-dim)" />, label: 'Jam Selesai', value: booking.jam_selesai },
      ]
    },
    {
      title: 'Informasi Pemesan',
      rows: [
        { icon: <IconUser size={24} color="var(--color-text-dim)" />, label: 'Nama', value: booking.nama_pemesan },
        { icon: <IconMail size={24} color="var(--color-text-dim)" />, label: 'Email', value: booking.email },
        { icon: <IconPhone size={24} color="var(--color-text-dim)" />, label: 'No. Telepon', value: booking.no_telepon },
      ]
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', fontFamily: 'var(--font-body)' }}>
      {/* Top Bar */}
      <div style={{
        background: '#fff', borderBottom: '1px solid var(--color-border)',
        padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff567d' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffb300' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#00c389' }}></div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#5392f9' }}></div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
            Baiboo
          </div>
        </div>
        <Button variant="secondary" onClick={() => navigate('/')} style={{ padding: '8px 16px' }}>← Kembali ke Beranda</Button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px', animation: 'fadeUp 0.5s ease' }}>
        {/* Success Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#d1fae5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <IconCheckCircle size={40} color="#10b981" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--color-text)', marginBottom: 6 }}>Booking Confirmation</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>Berikut adalah detail booking Anda</p>
        </div>

        {/* Main Card */}
        <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
          {/* Card Header - Booking Code */}
          <div style={{
            background: '#f8f9fa', padding: '24px',
            borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.12em', marginBottom: 4 }}>KODE BOOKING</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--color-accent)', letterSpacing: '0.06em' }}>{confirmCode}</div>
            </div>
          </div>

          {/* Info Sections */}
          {infoSections.map((section, si) => (
            <div key={si}>
              <div style={{ padding: '14px 24px 6px', fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {section.title}
              </div>
              {section.rows.map((row, ri) => (
                <div key={ri} style={{
                  display: 'flex', alignItems: 'center', padding: '14px 24px',
                  borderBottom: (si < infoSections.length - 1 || ri < section.rows.length - 1) ? '1px solid var(--color-border)' : 'none',
                }}>
                  <span style={{ fontSize: 20, marginRight: 14, width: 30, textAlign: 'center' }}>{row.icon}</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: 14, flex: 1 }}>{row.label}</span>
                  <span style={{ color: 'var(--color-text)', fontSize: 15, fontWeight: 600 }}>{row.value}</span>
                </div>
              ))}
            </div>
          ))}

          {/* Catatan */}
          {booking.catatan && (
            <div style={{ padding: '14px 24px', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <IconFileText size={24} color="var(--color-text-dim)" />
              <div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 2 }}>Catatan</div>
                <div style={{ color: 'var(--color-text)', fontSize: 14 }}>{booking.catatan}</div>
              </div>
            </div>
          )}

          {/* Total */}
          <div style={{
            background: '#fff5f5', borderTop: '2px dashed var(--color-border)',
            padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 600, fontSize: 16 }}>Total Pembayaran</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--color-danger)' }}>{formatRp(booking.total_harga)}</span>
          </div>
        </div>

        {/* Reminder Card */}
        <div style={{
          marginTop: 20, padding: '18px 20px', background: '#eff6ff', border: '1px solid #bfdbfe',
          borderRadius: 14, fontSize: 14, color: '#1e3a8a', lineHeight: 1.7,
        }}>
          <div style={{ fontWeight: 700, color: '#1e3a8a', marginBottom: 8, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconInfo size={20} color="#1d4ed8" /> Informasi Penting
          </div>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            <li>Datang <strong style={{ color: '#1d4ed8' }}>15 menit</strong> sebelum waktu bermain</li>
            <li>Tunjukkan kode booking <strong style={{ color: '#1d4ed8' }}>{confirmCode}</strong> di resepsionis</li>
            <li>Gunakan perlengkapan olahraga yang sesuai</li>
            <li>Pembatalan hanya bisa dilakukan melalui admin</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={() => navigate('/')}>Kembali ke Beranda</Button>
          <Button onClick={() => window.print()}><IconPrinter size={18} /> Cetak Bukti</Button>
        </div>
      </div>
    </div>
  );
}
