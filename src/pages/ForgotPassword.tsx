import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Loader2, ArrowLeft } from 'lucide-react'
import { useFormWithValidation } from '@/hooks/useFormWithValidation'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '@/utils/validation/schemas/auth.schema'
import { authService } from '@/services/api/auth/authService'
import { useToast } from '@/hooks/useToast'
import { ROUTES } from '@/constants/routes'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'

export const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const navigate = useNavigate()
  const { addToast } = useToast()

  const form = useFormWithValidation({
    schema: forgotPasswordSchema,
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      await authService.requestPasswordReset(data.email)

      setEmailSent(true)
      addToast({
        title: 'Reset code sent',
        message: 'Check your email for the verification code.',
        type: 'success',
      })

      // Navigate to verify code page with email in state
      setTimeout(() => {
        navigate('/verify-reset-code', { state: { email: data.email } })
      }, 2000)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to send reset code'
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
        <Link
          to={ROUTES.LOGIN}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot your password?
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your email address and we'll send you a verification code to
          reset your password.
        </p>
      </div>

      {emailSent ? (
        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            We've sent a verification code to{' '}
            <strong>{form.getValues('email')}</strong>
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Redirecting to verification page...
          </p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoComplete="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the email address associated with your account
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full cursor-pointer" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending code...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send reset code
                </>
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
