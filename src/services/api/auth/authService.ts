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
  token?: string
  accessToken?: string
  refreshToken: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    role?: string
  }
}

interface RefreshTokenResponse {
  token?: string
  accessToken?: string
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
    try {
      const { data } = await apiClient.post<ApiResponse<void>>('/auth/logout')
      return data
    } catch (error) {
      // Even if logout fails on backend, we should clear local tokens
      console.error('Logout error:', error)
      throw error
    }
  },

  refreshToken: async (refreshToken: string) => {
    const { data } = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
      '/auth/refresh',
      { refreshToken }
    )
    return data
  },

  requestPasswordReset: async (email: string) => {
    const { data } = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/password/request',
      { email }
    )
    return data
  },

  verifyResetCode: async (email: string, code: string) => {
    const { data } = await apiClient.post<ApiResponse<{ valid: boolean }>>(
      '/auth/password/verify',
      { email, code }
    )
    return data
  },

  resetPassword: async (code: string, newPassword: string, confirmPassword: string) => {
    const { data } = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/password/reset',
      { code, newPassword, confirmPassword }
    )
    return data
  },
}