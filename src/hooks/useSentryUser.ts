import { useEffect } from 'react'
import { useAppSelector } from './redux'
import { setUserContext, clearUserContext } from '@/config/sentry.config'

export function useSentryUser() {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (isAuthenticated && user) {
            // Set user context in Sentry
            setUserContext({
                id: user.id,
                username: user.name,
                role: user.role,
                email: user.email,
            })
        } else {
            // Clear user context on logout
            clearUserContext()
        }
    }, [isAuthenticated, user])
}
