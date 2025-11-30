import { apiClient } from '../client'
import type { ApiResponse } from '@/types/api'

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface LoginResponse {
  token: string
  refreshToken: string
  user: {
    id: string
    name: string
    email: string
    role?: string
  }
}

export const authService = {
  login: async (credentials: LoginRequest) => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials
    )
    return data
  },

  register: async (userData: RegisterRequest) => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>(
      '/auth/register',
      userData
    )
    return data
  },

  logout: async () => {
    const { data } = await apiClient.post<ApiResponse<void>>('/auth/logout')
    return data
  },

  refreshToken: async (refreshToken: string) => {
    const { data } = await apiClient.post<ApiResponse<{ token: string }>>(
      '/auth/refresh',
      { refreshToken }
    )
    return data
  },
}