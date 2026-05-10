import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Input, IconMapPin, IconCalendar, IconClock, IconUser, IconMail, IconPhone, IconAward, IconCheckCircle, IconAlert, IconFileText, IconInfo } from '../atoms/index.jsx';

const API = 'http://localhost:3000/api/v1';

const overlayStyle = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
  animation: 'fadeUp 0.3s ease',
};

const modalStyle = {
  background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 16,
  width: '95%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto',
  boxShadow: 'var(--shadow-widget)',
};

const labelStyle = { fontSize: 13, fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 6, display: 'block' };
const fieldGap = { marginBottom: 16 };



export default function BookingModal({ prefill = {}, onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=Form, 2=Review, 3=Bayar, 4=Sukses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdBooking, setCreatedBooking] = useState(null);

  // Form state – step 1
  const [form, setForm] = useState({
    nama_pemesan: '',
    email: '',
    no_telepon: '',
    nama_lapangan: prefill.namaLapangan || '',
    jenis_olahraga: prefill.jenisOlahraga || '',
    tanggal_main: prefill.tanggalMain || '',
    jam_mulai: prefill.jamMulai || '',
    jam_selesai: '',
    total_harga: prefill.hargaPerJam || 0,
    status: 'pending',
    catatan: '',
  });

  // Payment state – step 3
  const [belumBayarWarning, setBelumBayarWarning] = useState(false);

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  // --- Step 1 → 2: Validate & go to review ---
  const goToReview = () => {
    setError('');
    if (!form.nama_pemesan || !form.email || !form.no_telepon || !form.nama_lapangan || !form.jenis_olahraga || !form.tanggal_main || !form.jam_mulai || !form.jam_selesai) {
      setError('Semua field wajib diisi.');
      return;
    }
    // Calculate price from hours
    const [h1, m1] = form.jam_mulai.split(':').map(Number);
    const [h2, m2] = form.jam_selesai.split(':').map(Number);
    let hours = (h2 + m2 / 60) - (h1 + m1 / 60);
    if (hours <= 0) { setError('Jam selesai harus lebih dari jam mulai.'); return; }
    const basePrice = prefill.hargaPerJam || 100000;
    set('total_harga', Math.round(hours * basePrice));
    setStep(2);
  };

  // --- Step 2 → 3: Create booking then go to payment ---
  const createAndPay = async () => {
    setLoading(true);
    setError('');
    try {
      const [h1, m1] = form.jam_mulai.split(':').map(Number);
      const [h2, m2] = form.jam_selesai.split(':').map(Number);
      let hours = (h2 + m2 / 60) - (h1 + m1 / 60);
      const basePrice = prefill.hargaPerJam || 100000;
      const totalHarga = Math.round(hours * basePrice);

      const payload = { ...form, total_harga: totalHarga };
      const res = await axios.post(`${API}/bookings`, payload);
      setCreatedBooking(res.data.data);
      setForm(p => ({ ...p, total_harga: totalHarga }));
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal membuat booking.');
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: Konfirmasi pembayaran (Ya / Tidak) ---
  const handleSudahBayar = async () => {
    setLoading(true);
    setError('');
    setBelumBayarWarning(false);
    try {
      // Update booking status to confirmed
      if (createdBooking?.id) {
        await axios.put(`${API}/bookings/${createdBooking.id}`, { ...form, status: 'confirmed' });
      }
      setStep(4);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memproses pembayaran.');
    } finally {
      setLoading(false);
    }
  };

  const handleBelumBayar = () => {
    setBelumBayarWarning(true);
  };

  const formatRp = n => 'Rp ' + Number(n).toLocaleString('id-ID');

  // --- Render helpers per step ---
  const renderStep1 = () => (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={fieldGap}>
          <label style={labelStyle}>Nama Lapangan *</label>
          <Input value={form.nama_lapangan} onChange={e => set('nama_lapangan', e.target.value)} placeholder="Nama lapangan" />
        </div>
        <div style={fieldGap}>
          <label style={labelStyle}>Jenis Olahraga *</label>
          <select value={form.jenis_olahraga} onChange={e => set('jenis_olahraga', e.target.value)}
            style={{ width: '100%', padding: '12px 16px', background: '#fff', border: '1px solid var(--color-border)', borderRadius: 8, color: 'var(--color-text)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
            <option value="">-- Pilih --</option>
            <option>Futsal</option><option>Basket</option><option>Badminton</option><option>Tenis</option><option>Voli</option>
          </select>
        </div>
      </div>

      <div style={fieldGap}>
        <label style={labelStyle}>Nama Pemesan *</label>
        <Input value={form.nama_pemesan} onChange={e => set('nama_pemesan', e.target.value)} placeholder="Nama lengkap" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={fieldGap}>
          <label style={labelStyle}>Email *</label>
          <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@domain.com" />
        </div>
        <div style={fieldGap}>
          <label style={labelStyle}>No Telepon *</label>
          <Input value={form.no_telepon} onChange={e => set('no_telepon', e.target.value)} placeholder="08xxxxxxxxxx" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <div style={fieldGap}>
          <label style={labelStyle}>Tanggal Main *</label>
          <Input type="date" value={form.tanggal_main} onChange={e => set('tanggal_main', e.target.value)} />
        </div>
        <div style={fieldGap}>
          <label style={labelStyle}>Jam Mulai *</label>
          <Input type="time" value={form.jam_mulai} onChange={e => set('jam_mulai', e.target.value)} />
        </div>
        <div style={fieldGap}>
          <label style={labelStyle}>Jam Selesai *</label>
          <Input type="time" value={form.jam_selesai} onChange={e => set('jam_selesai', e.target.value)} />
        </div>
      </div>

      <div style={fieldGap}>
        <label style={labelStyle}>Catatan (opsional)</label>
        <Input value={form.catatan} onChange={e => set('catatan', e.target.value)} placeholder="Catatan tambahan..." />
      </div>
    </>
  );

  const renderStep2 = () => {
    const [h1, m1] = form.jam_mulai.split(':').map(Number);
    const [h2, m2] = form.jam_selesai.split(':').map(Number);
    const hours = (h2 + m2 / 60) - (h1 + m1 / 60);
    const basePrice = prefill.hargaPerJam || 100000;
    const total = Math.round(hours * basePrice);

    const rows = [
      ['Lapangan', form.nama_lapangan],
      ['Olahraga', form.jenis_olahraga],
      ['Pemesan', form.nama_pemesan],
      ['Email', form.email],
      ['Telepon', form.no_telepon],
      ['Tanggal', form.tanggal_main],
      ['Waktu', `${form.jam_mulai} — ${form.jam_selesai} (${hours.toFixed(1)} jam)`],
      ['Harga/jam', formatRp(basePrice)],
      ['Total', formatRp(total)],
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map(([k, v], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>{k}</span>
            <span style={{ fontWeight: k === 'Total' ? 800 : 600, color: k === 'Total' ? 'var(--color-danger)' : 'var(--color-text)', fontSize: k === 'Total' ? 18 : 14 }}>{v}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderStep3 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 4 }}>Total yang harus dibayar</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--color-danger)' }}>
          {formatRp(form.total_harga)}
        </div>
      </div>

      {/* Warning jika belum bayar */}
      {belumBayarWarning && (
        <div style={{
          padding: '16px 20px', background: '#fffbeb', border: '1px solid #fcd34d',
          borderRadius: 12, textAlign: 'center', animation: 'fadeUp 0.3s ease',
        }}>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}><IconAlert size={36} color="#d97706" /></div>
          <div style={{ color: '#d97706', fontWeight: 700, fontSize: 16 }}>Tolong bayar terlebih dahulu!</div>
          <div style={{ color: '#92400e', fontSize: 13, marginTop: 4 }}>Silakan lakukan pembayaran, lalu klik "Ya, Sudah Bayar".</div>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', marginBottom: 20 }}>
          Apakah Anda sudah membayar?
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <Button onClick={handleSudahBayar} disabled={loading} style={{ padding: '14px 36px', fontSize: 16 }}>
            {loading ? 'Memproses...' : '✅ Ya, Sudah Bayar'}
          </Button>
          <Button variant="danger" onClick={handleBelumBayar} style={{ padding: '14px 36px', fontSize: 16 }}>
            ❌ Tidak
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => {
    const bookingId = createdBooking?.id;
    const confirmCode = `SB-${String(bookingId).padStart(6, '0')}`;

    const infoRows = [
      { icon: <IconMapPin size={20} color="var(--color-text-dim)" />, label: 'Lapangan', value: form.nama_lapangan },
      { icon: <IconAward size={20} color="var(--color-text-dim)" />, label: 'Olahraga', value: form.jenis_olahraga },
      { icon: <IconCalendar size={20} color="var(--color-text-dim)" />, label: 'Tanggal', value: form.tanggal_main },
      { icon: <IconClock size={20} color="var(--color-text-dim)" />, label: 'Waktu', value: `${form.jam_mulai} — ${form.jam_selesai}` },
      { icon: <IconUser size={20} color="var(--color-text-dim)" />, label: 'Pemesan', value: form.nama_pemesan },
      { icon: <IconMail size={20} color="var(--color-text-dim)" />, label: 'Email', value: form.email },
      { icon: <IconPhone size={20} color="var(--color-text-dim)" />, label: 'Telepon', value: form.no_telepon },
    ];

    return (
      <div style={{ animation: 'fadeUp 0.4s ease' }}>
        {/* Success Banner */}
        <div style={{ textAlign: 'center', padding: '24px 0 20px' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#d1fae5', color: '#10b981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><IconCheckCircle size={32} /></div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#10b981', marginBottom: 4 }}>Booking Dikonfirmasi!</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>Simpan informasi ini sebagai bukti booking Anda</p>
        </div>

        {/* Booking Card */}
        <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
          {/* Card Header */}
          <div style={{ background: '#f8f9fa', padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.1em', marginBottom: 2 }}>KODE BOOKING</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--color-accent)', letterSpacing: '0.05em' }}>{confirmCode}</div>
            </div>
            <div style={{ padding: '6px 14px', background: '#d1fae5', border: '1px solid #10b981', borderRadius: 20, fontSize: 12, fontWeight: 700, color: '#047857' }}>CONFIRMED</div>
          </div>

          {/* Info Rows */}
          <div style={{ padding: '4px 0' }}>
            {infoRows.map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', borderBottom: i < infoRows.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <span style={{ fontSize: 18, marginRight: 12, width: 28, textAlign: 'center' }}>{row.icon}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: 13, width: 90, flexShrink: 0 }}>{row.label}</span>
                <span style={{ color: 'var(--color-text)', fontSize: 14, fontWeight: 600, flex: 1, textAlign: 'right' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ background: '#fff5f5', borderTop: '2px dashed var(--color-border)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Pembayaran</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--color-danger)' }}>{formatRp(form.total_harga)}</span>
          </div>
        </div>

        {/* Catatan */}
        {form.catatan && (
          <div style={{ marginTop: 12, padding: '12px 16px', background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, fontSize: 13, color: '#d97706', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <IconFileText size={18} style={{ flexShrink: 0, marginTop: 2 }} />
            <div><strong style={{ display: 'block', marginBottom: 2 }}>Catatan:</strong> {form.catatan}</div>
          </div>
        )}

        {/* Reminder */}
        <div style={{ marginTop: 12, padding: '14px 16px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, fontSize: 13, color: '#1e3a8a', lineHeight: 1.6, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <IconInfo size={20} color="#1d4ed8" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            Silakan datang <strong style={{ color: '#1d4ed8' }}>15 menit</strong> sebelum waktu booking. Tunjukkan kode booking <strong style={{ color: '#1d4ed8' }}>{confirmCode}</strong> di resepsionis.
          </div>
        </div>
      </div>
    );
  };

  const stepTitles = ['', 'Isi Data Booking', 'Review Pesanan', 'Pembayaran', 'Selesai'];

  return (
    <div style={overlayStyle} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={{ padding: '24px 28px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--color-text)' }}>
            {stepTitles[step]}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>

        {/* Progress */}
        {step < 4 && (
          <div style={{ display: 'flex', gap: 4, padding: '16px 28px 0' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? 'var(--color-accent)' : 'var(--color-border)', transition: 'background 0.3s' }} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ margin: '16px 28px 0', padding: '12px 16px', background: '#ef444422', border: '1px solid #ef444444', borderRadius: 10, color: '#ef4444', fontSize: 13, display: 'flex', gap: 8, alignItems: 'center' }}>
            <IconAlert size={18} /> {error}
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '20px 28px' }}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        {/* Footer */}
        <div style={{ padding: '0 28px 24px', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          {step === 1 && (
            <>
              <Button variant="secondary" onClick={onClose}>Batal</Button>
              <Button onClick={goToReview}>Lanjut ke Review →</Button>
            </>
          )}
          {step === 2 && (
            <>
              <Button variant="secondary" onClick={() => { setStep(1); setError(''); }}>← Kembali</Button>
              <Button onClick={createAndPay} disabled={loading}>{loading ? 'Memproses...' : 'Konfirmasi & Bayar →'}</Button>
            </>
          )}
          {step === 3 && (
            <Button variant="secondary" onClick={() => { setStep(2); setError(''); setBelumBayarWarning(false); }}>← Kembali</Button>
          )}
          {step === 4 && (
            <>
              <Button variant="secondary" onClick={onClose}>Tutup</Button>
              <Button onClick={() => { onClose(); navigate(`/booking/${createdBooking?.id}`); }}>Lihat Detail Booking →</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
