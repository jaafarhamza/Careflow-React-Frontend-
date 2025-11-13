import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleBasedRoute } from './RoleBasedRoute'
import { ROUTES } from '@/constants/routes'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { NotFound } from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ADMIN,
    element: (
      <RoleBasedRoute allowedRoles={['admin']}>
        <div>Admin Page</div>
      </RoleBasedRoute>
    ),
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.NOT_FOUND} replace />,
  },
])