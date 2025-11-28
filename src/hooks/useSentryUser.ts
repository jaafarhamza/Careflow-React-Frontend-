import { useEffect } from 'react'
import { useAppSelector } from './redux'
import { setUserContext, clearUserContext } from '@/config/sentry.config'

export function useSentryUser() {
    const { isAuthenticated } = useAppSelector((state) => state.auth)
    const { profile } = useAppSelector((state) => state.user)

    useEffect(() => {
        if (isAuthenticated && profile) {
            setUserContext({
                id: profile.id,
                email: profile.email,
                username: profile.name,
                role: profile.role,
            })
        } else {
            clearUserContext()
        }
    }, [isAuthenticated, profile])
}
