import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Shield, Loader2, ArrowLeft, RefreshCw } from 'lucide-react'
import { authService } from '@/services/api/auth/authService'
import { useToast } from '@/hooks/useToast'
import { useCountdown } from '@/hooks/useCountdown'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CODE_EXPIRY_SECONDS = 300 // 5 minutes

export const VerifyResetCode = () => {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { addToast } = useToast()
  const { secondsRemaining, formatTime, reset, start } =
    useCountdown(CODE_EXPIRY_SECONDS)

  const email = location.state?.email

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password')
      return
    }
    start()
  }, [email, navigate, start])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (code.length !== 6) {
      addToast({
        title: 'Invalid code',
        message: 'Please enter a 6-digit code',
        type: 'error',
      })
      return
    }

    setIsLoading(true)
    try {
      await authService.verifyResetCode(email, code)

      addToast({
        title: 'Code verified',
        message: 'You can now reset your password',
        type: 'success',
      })

      navigate('/reset-password', { state: { email, code } })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Invalid or expired code'
      addToast({
        title: 'Verification failed',
        message: errorMessage,
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    try {
      await authService.requestPasswordReset(email)

      addToast({
        title: 'Code resent',
        message: 'A new verification code has been sent to your email',
        type: 'success',
      })

      reset(CODE_EXPIRY_SECONDS)
      setCode('')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to resend code'
      addToast({
        title: 'Error',
        message: errorMessage,
        type: 'error',
      })
    } finally {
      setIsResending(false)
    }
  }

  const isExpired = secondsRemaining === 0

  return (
    <div className="w-full">
      <div className="mb-8">
        <Link
          to="/forgot-password"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify your code
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enter the 6-digit code sent to <strong>{email}</strong>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            disabled={isLoading || isExpired}
            className="text-center text-2xl tracking-widest"
            autoFocus
          />
          <div className="flex items-center justify-between text-sm">
            <span
              className={`font-medium ${
                isExpired ? 'text-destructive' : 'text-muted-foreground'
              }`}
            >
              {isExpired ? 'Code expired' : `Expires in ${formatTime}`}
            </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || !isExpired}
              className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Resend code
                </>
              )}
            </button>
          </div>
        </div>

        <Button
          className="w-full cursor-pointer"
          type="submit"
          disabled={isLoading || code.length !== 6 || isExpired}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Verify Code
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Didn't receive the code? Check your spam folder or try resending.</p>
      </div>
    </div>
  )
}
