import { env } from '@/env'
import axios  from 'axios'

// Criação da instância
export const api = axios.create({
  baseURL: env.VITE_APP_URL,
})

api.interceptors.request.use((config) => {

  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

