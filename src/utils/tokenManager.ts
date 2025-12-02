interface TokenData {
    accessToken: string
    refreshToken: string
    user?: {
        id: string
        firstName: string
        lastName: string
        email: string
        role?: string
    }
}

let refreshTimer: number | null = null

// Token storage keys
const TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

// Decode JWT token to extract payload
export function decodeToken(token: string): { exp?: number; iat?: number } {
    if (!token) {
        return {}
    }

    try {
        const base64Url = token.split('.')[1]
        if (!base64Url) {
            return {}
        }

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        )
        return JSON.parse(jsonPayload)
    } catch {
        return {}
    }
}

// Get token expiration time in milliseconds
export function getTokenExpirationTime(token: string): number | null {
    const decoded = decodeToken(token)
    if (decoded.exp) {
        return decoded.exp * 1000 // Convert to milliseconds
    }
    return null
}

// Check if token is expired
export function isTokenExpired(token: string): boolean {
    const expirationTime = getTokenExpirationTime(token)
    if (!expirationTime) return true
    return Date.now() >= expirationTime
}

// Get access token from storage
export function getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
}

// Get refresh token from storage
export function getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}

// Set tokens in storage
export function setTokens(tokenData: TokenData): void {
    if (!tokenData.accessToken) {
        return
    }

    localStorage.setItem(TOKEN_KEY, tokenData.accessToken)
    if (tokenData.refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, tokenData.refreshToken)
    }
}

// Clear all tokens from storage
export function clearTokens(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    cancelTokenRefresh()
}



// Schedule automatic token refresh before expiration
// Refreshes 1 minute (60 seconds) before token expires
export function scheduleTokenRefresh(token: string): void {
    if (!token) {
        return
    }

    // Cancel any existing timer
    cancelTokenRefresh()

    const expirationTime = getTokenExpirationTime(token)
    if (!expirationTime) {
        return
    }

    // Calculate time until refresh (1 minute before expiration)
    const now = Date.now()
    const timeUntilExpiration = expirationTime - now
    const refreshBuffer = 60 * 1000 // 1 minute in milliseconds
    const timeUntilRefresh = timeUntilExpiration - refreshBuffer

    if (timeUntilRefresh <= 0) {
        return
    }

    // Schedule the refresh - will be handled by API client interceptor
    refreshTimer = setTimeout(() => {
        // Token refresh will trigger on next API call
    }, timeUntilRefresh) as unknown as number
}

// Cancel scheduled token refresh
export function cancelTokenRefresh(): void {
    if (refreshTimer) {
        clearTimeout(refreshTimer)
        refreshTimer = null
    }
}

// Initialize token management
// Call this on app startup to schedule refresh for existing token
export function initializeTokenManagement(): void {
    const token = getAccessToken()
    if (token && !isTokenExpired(token)) {
        scheduleTokenRefresh(token)
    } else if (token) {
        // Token exists but is expired, clear it
        clearTokens()
    }
}
