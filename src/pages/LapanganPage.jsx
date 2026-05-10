import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchBar } from '../components/molecules/index.jsx';
import { Button, IconRefresh, IconAlert } from '../components/atoms/index.jsx';

export default function LapanganPage() {
  const [lapangan, setLapangan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    axios.get('http://localhost:3000/api/v1/lapangan')
      .then(res => setLapangan(res.data.data || []))
      .catch(err => setError('Gagal mengambil data lapangan'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData() }, []);

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#e2e8f0', marginBottom: 4 }}>
            Master Lapangan
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Kelola data lapangan yang tersedia.</p>
        </div>
        <Button onClick={fetchData} variant="secondary"><IconRefresh /> Refresh</Button>
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><IconAlert size={20} /> {error}</div>}

      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '20px' }}>
        {loading ? <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--color-text)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px' }}>ID</th>
                <th style={{ padding: '12px 8px' }}>Nama Lapangan</th>
                <th style={{ padding: '12px 8px' }}>Olahraga</th>
                <th style={{ padding: '12px 8px' }}>Harga / Jam</th>
              </tr>
            </thead>
            <tbody>
              {lapangan.length > 0 ? lapangan.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 8px' }}>{l.id}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 'bold' }}>{l.nama}</td>
                  <td style={{ padding: '12px 8px' }}>{l.jenis_olahraga}</td>
                  <td style={{ padding: '12px 8px', color: '#22d3ee' }}>Rp {l.harga_per_jam.toLocaleString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Belum ada data lapangan.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
