import { useCallback, useEffect } from 'react'
import { useAppDispatch } from './redux'
import { setCredentials, logout as logoutAction } from '@/store/slices/authSlice'
import { setProfile, clearProfile } from '@/store/slices/userSlice'
import type { UserProfile } from '@/store/slices/userSlice'
import {
    setTokens,
    clearTokens,
    scheduleTokenRefresh,
    cancelTokenRefresh,
} from '@/utils/tokenManager'
import { authService } from '@/services/api/auth/authService'

export interface LoginCredentials {
    accessToken: string
    refreshToken?: string
    user: UserProfile
}

/**
 * Hook for authentication actions
 * Handles login/logout with proper state management and token management
 */
export function useAuth() {
    const dispatch = useAppDispatch()

    const login = useCallback(
        ({ accessToken, refreshToken, user }: LoginCredentials) => {
            // Set authentication credentials in Redux
            dispatch(
                setCredentials({
                    accessToken,
                    refreshToken,
                    user,
                })
            )

            // Set user profile
            dispatch(setProfile(user))

            // Store tokens using tokenManager
            setTokens({ accessToken, refreshToken: refreshToken || '', user })

            // Schedule automatic token refresh
            scheduleTokenRefresh(accessToken)
        },
        [dispatch]
    )

    const logout = useCallback(async () => {
        try {
            // Call backend logout endpoint
            await authService.logout()
        } catch (error) {
            // Continue with logout even if backend call fails
            console.error('Logout API call failed:', error)
        } finally {
            // Clear Redux state
            dispatch(logoutAction())
            dispatch(clearProfile())

            // Clear tokens and cancel refresh timer
            clearTokens()
            cancelTokenRefresh()
        }
    }, [dispatch])

    // Listen for auth:logout event from API client
    useEffect(() => {
        const handleLogout = () => {
            dispatch(logoutAction())
            dispatch(clearProfile())
        }

        window.addEventListener('auth:logout', handleLogout)
        return () => window.removeEventListener('auth:logout', handleLogout)
    }, [dispatch])

    return {
        login,
        logout,
    }
}
