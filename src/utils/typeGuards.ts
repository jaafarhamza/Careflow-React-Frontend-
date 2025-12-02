import type { ApiResponse } from '@/types/api'

export function isApiResponse<T>(data: unknown): data is ApiResponse<T> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    typeof (data as ApiResponse<T>).success === 'boolean'
  )
}

export function hasAccessToken(data: unknown): data is { accessToken: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'accessToken' in data &&
    typeof (data as { accessToken: string }).accessToken === 'string'
  )
}

export function hasToken(data: unknown): data is { token: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'token' in data &&
    typeof (data as { token: string }).token === 'string'
  )
}

export function hasRefreshToken(data: unknown): data is { refreshToken: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'refreshToken' in data &&
    typeof (data as { refreshToken: string }).refreshToken === 'string'
  )
}
