import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// ── Booking Service ───────────────────────────────────────────

export const bookingService = {
  // GET All Bookings
  getAll: async () => {
    const response = await api.get('/bookings')
    return response.data
  },

  // GET Booking By ID
  getById: async (id) => {
    const response = await api.get(`/bookings/${id}`)
    return response.data
  },

  // POST Create Booking
  create: async (data) => {
    const response = await api.post('/bookings', data)
    return response.data
  },

  // PUT Update Booking
  update: async (id, data) => {
    const response = await api.put(`/bookings/${id}`, data)
    return response.data
  },

  // DELETE Booking
  delete: async (id) => {
    const response = await api.delete(`/bookings/${id}`)
    return response.data
  },
}

export default api
