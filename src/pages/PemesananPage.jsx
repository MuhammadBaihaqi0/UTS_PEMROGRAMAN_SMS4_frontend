import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, IconRefresh } from '../components/atoms/index.jsx';

export default function PemesananPage() {
  const [pemesanan, setPemesanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    axios.get('http://localhost:3000/api/v1/pemesanan')
      .then(res => setPemesanan(res.data.data || []))
      .catch(err => setError('Gagal mengambil data pemesanan'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData() }, []);

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#e2e8f0', marginBottom: 4 }}>
            Data Pemesanan 📋
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Kelola data transaksi pemesanan.</p>
        </div>
        <Button onClick={fetchData} variant="secondary"><IconRefresh /> Refresh</Button>
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: 20 }}>⚠️ {error}</div>}

      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '20px' }}>
        {loading ? <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--color-text)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px' }}>ID</th>
                <th style={{ padding: '12px 8px' }}>Pemesan</th>
                <th style={{ padding: '12px 8px' }}>Tanggal Main</th>
                <th style={{ padding: '12px 8px' }}>Waktu</th>
              </tr>
            </thead>
            <tbody>
              {pemesanan.length > 0 ? pemesanan.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 8px' }}>{p.id}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 'bold' }}>{p.nama_pemesan}</td>
                  <td style={{ padding: '12px 8px' }}>{p.tanggal_main}</td>
                  <td style={{ padding: '12px 8px' }}>{p.jam_mulai} - {p.jam_selesai}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Belum ada data pemesanan.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
