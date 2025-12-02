import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import type { ApiError } from '@/types/api'
import {
  getAccessToken,
  clearTokens,
  scheduleTokenRefresh,
} from '@/utils/tokenManager'
import { authService } from './auth/authService'

// Use relative path in development to leverage Vite proxy
const baseURL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL
const timeout = Number(import.meta.env.VITE_API_TIMEOUT)

export const apiClient = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

// Request interceptor - Add access token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - Handle 401 errors and refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return apiClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        // Call refresh endpoint
        const { data } = await authService.refreshToken(refreshToken)
        const newToken = data.accessToken || data.token || ''
        
        if (!newToken) {
          throw new Error('No token returned from refresh endpoint')
        }

        // Update token in storage
        localStorage.setItem('accessToken', newToken)

        // Schedule next automatic refresh
        scheduleTokenRefresh(newToken)

        // Process queued requests with new token
        processQueue(null, newToken)

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }

        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        processQueue(refreshError, null)
        clearTokens()

        // Clear Redux state
        window.dispatchEvent(new Event('auth:logout'))

        // Redirect to login
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Transform error to ApiError format
    const apiError: ApiError = {
      message:
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        'An error occurred',
      status: error.response?.status || 500,
      code: error.code,
    }

    return Promise.reject(apiError)
  }
)