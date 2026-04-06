import { env } from '@/env'
import axios  from 'axios'
// import { tokenStorageServices } from '@/storage/token-storage'
// import { tokenStorageServices } from '@/storege'

// Criação da instância
export const api = axios.create({
  baseURL: env.VITE_APP_URL,
})

// Variável de controle para evitar múltiplas chamadas simultâneas de refresh
// let isRefreshing = false
// let failedQueue: {
//   resolve: (token: string) => void
//   reject: (err: any) => void
// }[] = []

// const processQueue = (token: string | null, error: any = null) => {
//   failedQueue.forEach((prom) => {
//     if (token) {
//       prom.resolve(token)
//     } else {
//       prom.reject(error)
//     }
//   })

//   failedQueue = []
// }

// Interceptor de requisição
// api.interceptors.request.use((request) => {
//   const token = tokenStorageServices.get()
//   if (token) {
//     request.headers['Authorization'] = `Bearer ${token}`
//   }
//   return request
// })

// Interceptor de resposta para lidar com refresh token
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

//     if (error.response?.status === 401 && !originalRequest._retry && tokenStorageServices.get()) {
//       originalRequest._retry = true

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({
//             resolve: (token: string) => {
//               originalRequest.headers = {
//                 ...originalRequest.headers,
//                 Authorization: `Bearer ${token}`,
//               }
//               resolve(api(originalRequest))
//             },
//             reject,
//           })
//         })
//       }

//       isRefreshing = true

//       try {
//         const response = await axios.post(`${env.VITE_APP_URL}/refresh`, {
//           refreshToken: tokenStorageServices.get(),
//         })

//         const newAccessToken = response.data.accessToken
//         tokenStorageServices.set(newAccessToken) // Salva novo access token

//         processQueue(newAccessToken)

//         originalRequest.headers = {
//           ...originalRequest.headers,
//           Authorization: `Bearer ${newAccessToken}`,
//         }

//         return api(originalRequest)
//       } catch (refreshError) {
//         processQueue(null, refreshError)
//         tokenStorageServices.remove()
//         window.location.href = '/sign-in'
//         return Promise.reject(refreshError)
//       } finally {
//         isRefreshing = false
//       }
//     }

//     return Promise.reject(error)
//   }
// )
