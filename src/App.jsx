import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout.jsx'
import DashboardPage    from './pages/DashboardPage.jsx'
import AllBookingsPage  from './pages/AllBookingsPage.jsx'
import DetailPage       from './pages/DetailPage.jsx'
import LandingPage      from './pages/LandingPage.jsx' // Import halaman baru
import LapanganPage     from './pages/LapanganPage.jsx'
import PemesananPage    from './pages/PemesananPage.jsx'
import PembayaranPage   from './pages/PembayaranPage.jsx'
import JadwalPage       from './pages/JadwalPage.jsx'
import BookingConfirmationPage from './pages/BookingConfirmationPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Klien (Tanpa Sidebar) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/booking/:id" element={<BookingConfirmationPage />} />

        {/* Rute Admin (Dengan Sidebar) */}
        <Route path="/*" element={
          <MainLayout>
            <Routes>
              <Route path="/dashboard"  element={<DashboardPage />} />
              <Route path="/lapangan"   element={<LapanganPage />} />
              <Route path="/jadwal"     element={<JadwalPage />} />
              <Route path="/pemesanan"  element={<PemesananPage />} />
              <Route path="/pembayaran" element={<PembayaranPage />} />
              <Route path="/all"        element={<AllBookingsPage />} />
              <Route path="/detail"     element={<DetailPage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="*"           element={
                <div style={{ textAlign: 'center', paddingTop: 80 }}>
                  <div style={{ fontSize: 64 }}>404</div>
                  <p style={{ color: 'var(--color-text-muted)' }}>Halaman tidak ditemukan</p>
                </div>
              } />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </BrowserRouter>
  )
}