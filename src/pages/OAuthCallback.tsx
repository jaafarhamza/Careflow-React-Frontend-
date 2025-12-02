import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { ROUTES } from '@/constants/routes'

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const { addToast } = useToast()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for error parameter
        const errorParam = searchParams.get('error')
        if (errorParam) {
          throw new Error(
            errorParam === 'access_denied'
              ? 'You cancelled the login process'
              : `OAuth error: ${errorParam}`
          )
        }

        // Get token from URL parameters
        const token =
          searchParams.get('token') || searchParams.get('accessToken')

        if (!token) {
          throw new Error('No access token received from Google OAuth')
        }

        // Decode JWT to get user ID and role
        try {
          const base64Url = token.split('.')[1]
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          )
          const jwtPayload = JSON.parse(jsonPayload)

          // Get user data from URL parameters
          const firstName = searchParams.get('firstName') || ''
          const lastName = searchParams.get('lastName') || ''
          const email = searchParams.get('email') || ''
          const userId = searchParams.get('userId') || jwtPayload.sub

          // Construct user object
          const user = {
            id: userId,
            firstName,
            lastName,
            email,
            role: jwtPayload.role || 'patient',
          }

          // Store token and user data
          login({
            accessToken: token,
            refreshToken: searchParams.get('refreshToken') || '',
            user,
          })

          addToast({
            title: `Welcome, ${firstName} ${lastName}!`,
            message: 'Successfully signed in with Google',
            type: 'success',
          })

          // Redirect to dashboard
          navigate(ROUTES.DASHBOARD, { replace: true })
        } catch (decodeError) {
          console.error('JWT decode error:', decodeError)
          throw new Error('Invalid token format')
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'OAuth authentication failed'

        setError(errorMessage)

        addToast({
          title: 'Authentication Failed',
          message: errorMessage,
          type: 'error',
        })

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate(ROUTES.LOGIN, { replace: true })
        }, 3000)
      }
    }

    handleCallback()
  }, [searchParams, navigate, login, addToast])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-4 text-center">
          <div className="rounded-lg border border-destructive bg-destructive/10 p-6">
            <h2 className="text-lg font-semibold text-destructive">
              Authentication Failed
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <p className="mt-4 text-xs text-muted-foreground">
              Redirecting to login page...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-4 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        <h2 className="text-lg font-semibold">Completing sign in...</h2>
        <p className="text-sm text-muted-foreground">
          Please wait while we complete your authentication
        </p>
      </div>
    </div>
  )
}
