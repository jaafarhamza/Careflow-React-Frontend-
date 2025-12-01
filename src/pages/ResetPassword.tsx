import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'
import { useFormWithValidation } from '@/hooks/useFormWithValidation'
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from '@/utils/validation/schemas/auth.schema'
import { authService } from '@/services/api/auth/authService'
import { useToast } from '@/hooks/useToast'
import { ROUTES } from '@/constants/routes'
import {
  calculatePasswordStrength,
  getPasswordStrengthBarColor,
} from '@/utils/passwordStrength'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(
    calculatePasswordStrength('')
  )

  const navigate = useNavigate()
  const location = useLocation()
  const { addToast } = useToast()

  const email = location.state?.email
  const code = location.state?.code

  useEffect(() => {
    if (!email || !code) {
      navigate('/forgot-password')
    }
  }, [email, code, navigate])

  const form = useFormWithValidation({
    schema: resetPasswordSchema,
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const password = form.watch('password')

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password))
  }, [password])

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    try {
      await authService.resetPassword(code, data.password, data.confirmPassword)

      addToast({
        title: 'Password reset successful',
        message: 'You can now sign in with your new password',
        type: 'success',
      })

      setTimeout(() => {
        navigate(ROUTES.LOGIN)
      }, 2000)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to reset password'
      addToast({
        title: 'Error',
        message: errorMessage,
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset your password
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your new password below
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            name="username"
            value={email || ''}
            autoComplete="username"
            readOnly
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Create a strong password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      disabled={isLoading}
                      className="pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                {password && (
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <div
                          key={index}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            index <= passwordStrength.score
                              ? getPasswordStrengthBarColor(
                                  passwordStrength.score
                                )
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-sm font-medium ${passwordStrength.color}`}
                    >
                      {passwordStrength.label}
                    </p>
                    {passwordStrength.feedback.length > 0 && (
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {passwordStrength.feedback.map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Confirm your password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      disabled={isLoading}
                      className="pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                      aria-label={
                        showConfirmPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full cursor-pointer">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting password...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Reset Password
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <Link to={ROUTES.LOGIN} className="text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  )
}
