import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, IconRefresh } from '../components/atoms/index.jsx';

export default function JadwalPage() {
  const [lapangan, setLapangan] = useState([]);
  const [selectedLapangan, setSelectedLapangan] = useState('');
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/lapangan')
      .then(res => setLapangan(res.data.data || []))
      .catch(err => setError('Gagal mengambil data lapangan'));
  }, []);

  const fetchJadwal = (lapanganId) => {
    if (!lapanganId) return;
    setLoading(true);
    axios.get(`http://localhost:3000/api/v1/jadwal/${lapanganId}`)
      .then(res => setJadwal(res.data.data || []))
      .catch(err => setError('Gagal mengambil jadwal'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJadwal(selectedLapangan);
  }, [selectedLapangan]);

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#e2e8f0', marginBottom: 4 }}>
            Jadwal & Ketersediaan 📅
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Cek ketersediaan jam lapangan.</p>
        </div>
        <Button onClick={() => fetchJadwal(selectedLapangan)} variant="secondary"><IconRefresh /> Refresh</Button>
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: 20 }}>⚠️ {error}</div>}

      <div style={{ marginBottom: 20 }}>
        <select 
          value={selectedLapangan} 
          onChange={(e) => setSelectedLapangan(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)', width: '300px' }}
        >
          <option value="">-- Pilih Lapangan --</option>
          {lapangan.map(l => (
            <option key={l.id} value={l.id}>{l.nama} ({l.jenis_olahraga})</option>
          ))}
        </select>
      </div>

      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '20px' }}>
        {!selectedLapangan ? (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>Silakan pilih lapangan terlebih dahulu.</p>
        ) : loading ? (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>Loading jadwal...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--color-text)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px' }}>Tanggal Main</th>
                <th style={{ padding: '12px 8px' }}>Waktu</th>
              </tr>
            </thead>
            <tbody>
              {jadwal.length > 0 ? jadwal.map((j, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 'bold' }}>{j.tanggal_main}</td>
                  <td style={{ padding: '12px 8px' }}>{j.jam_mulai} - {j.jam_selesai}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="2" style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Belum ada jadwal terbooking.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
