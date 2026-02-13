import { envVeriables } from '@/config/envVariables'
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios'

const API_BASE_URL =envVeriables.NEXT_PUBLIC_API_URL

// Create axios instance
const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials:true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
// httpClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // Add auth token if available
//     const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// Response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
        window.location.href = '/auth'
      }
    }
    return Promise.reject(error)
  }
)

export default httpClient
