import { useCallback } from 'react'
import { useAppDispatch } from './redux'
import { setCredentials, logout as logoutAction } from '@/store/slices/authSlice'
import { setProfile, clearProfile } from '@/store/slices/userSlice'
import type { UserProfile } from '@/store/slices/userSlice'

export interface LoginCredentials {
    token: string
    refreshToken?: string
    user: UserProfile
}

/**
 * Hook for authentication actions
 * Handles login/logout with proper state management across auth and user slices
 */
export function useAuth() {
    const dispatch = useAppDispatch()

    const login = useCallback(
        ({ token, refreshToken, user }: LoginCredentials) => {
            // Set authentication credentials
            dispatch(setCredentials({ token, refreshToken }))

            // Set user profile
            dispatch(setProfile(user))

            // Store tokens in localStorage for API client
            localStorage.setItem('token', token)
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken)
            }
        },
        [dispatch]
    )

    const logout = useCallback(() => {
        // Clear Redux state
        dispatch(logoutAction())
        dispatch(clearProfile())

        // Clear localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
    }, [dispatch])

    return {
        login,
        logout,
    }
}
