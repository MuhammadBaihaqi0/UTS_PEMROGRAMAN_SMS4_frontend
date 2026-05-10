import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, IconRefresh } from '../components/atoms/index.jsx';

export default function PembayaranPage() {
  const [pembayaran, setPembayaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    axios.get('http://localhost:3000/api/v1/pembayaran')
      .then(res => setPembayaran(res.data.data || []))
      .catch(err => setError('Gagal mengambil data pembayaran'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData() }, []);

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#e2e8f0', marginBottom: 4 }}>
            Validasi Pembayaran 💳
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Cek dan validasi bukti pembayaran.</p>
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
                <th style={{ padding: '12px 8px' }}>Pemesanan ID</th>
                <th style={{ padding: '12px 8px' }}>Metode</th>
                <th style={{ padding: '12px 8px' }}>Jumlah</th>
                <th style={{ padding: '12px 8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {pembayaran.length > 0 ? pembayaran.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 8px' }}>{p.id}</td>
                  <td style={{ padding: '12px 8px' }}>#{p.pemesanan_id}</td>
                  <td style={{ padding: '12px 8px' }}>{p.metode_bayar}</td>
                  <td style={{ padding: '12px 8px', color: '#22d3ee' }}>Rp {p.jumlah_bayar.toLocaleString()}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ 
                      padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 'bold',
                      background: p.status_bayar === 'paid' ? '#10b98122' : '#f59e0b22',
                      color: p.status_bayar === 'paid' ? '#10b981' : '#f59e0b'
                    }}>
                      {p.status_bayar.toUpperCase()}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Belum ada data pembayaran.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
