import { apiClient } from '../client'
import type { ApiResponse } from '@/types/api'

interface OAuthCallbackParams {
    code?: string
    error?: string
    state?: string
}

interface OAuthResponse {
    accessToken: string
    refreshToken?: string
    user: {
        id: string
        firstName: string
        lastName: string
        email: string
        role?: string
    }
}

export const oauthService = {
    /**
     * Initiate Google OAuth login
     * Redirects to backend Google OAuth endpoint
     */
    initiateGoogleLogin: () => {
        const baseURL = import.meta.env.DEV
            ? window.location.origin + '/api'
            : import.meta.env.VITE_API_BASE_URL

        window.location.href = `${baseURL}/auth/google`
    },

    /**
     * Handle OAuth callback
     * Exchange authorization code for tokens
     */
    handleCallback: async (params: OAuthCallbackParams) => {
        if (params.error) {
            throw new Error(params.error || 'OAuth authentication failed')
        }

        if (!params.code) {
            throw new Error('No authorization code received')
        }

        const { data } = await apiClient.get<ApiResponse<OAuthResponse>>(
            '/auth/google/callback',
            {
                params: {
                    code: params.code,
                    state: params.state,
                },
            }
        )

        return data
    },
}
