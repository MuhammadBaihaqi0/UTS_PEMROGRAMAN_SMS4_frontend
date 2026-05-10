import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout.jsx'
import DashboardPage    from './pages/DashboardPage.jsx'
import AllBookingsPage  from './pages/AllBookingsPage.jsx'
import DetailPage       from './pages/DetailPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/"           element={<DashboardPage />} />
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
    </BrowserRouter>
  )
}
