import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'
import { ROUTES } from '@/constants/routes'

interface RoleBasedRouteProps {
  children: React.ReactNode
  allowedRoles: string[]
}

export const RoleBasedRoute = ({
  children,
  allowedRoles,
}: RoleBasedRouteProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const { profile } = useAppSelector((state) => state.user)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  const userRole = profile?.role || 'user'

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <>{children}</>
}
