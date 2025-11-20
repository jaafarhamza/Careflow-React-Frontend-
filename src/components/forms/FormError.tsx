import type { FieldError } from 'react-hook-form'
import { getErrorMessage } from '@/utils/form.utils'

interface FormErrorProps {
  error?: FieldError | string
  className?: string
}

export function FormError({ error, className = '' }: FormErrorProps) {
  const message = getErrorMessage(error)

  if (!message) return null

  return (
    <p
      className={`text-sm text-destructive mt-1 ${className}`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </p>
  )
}

interface FormErrorsProps {
  errors: string[]
  title?: string
  className?: string
}

export function FormErrors({
  errors,
  title = 'Please fix the following errors:',
  className = '',
}: FormErrorsProps) {
  if (errors.length === 0) return null

  return (
    <div
      className={`bg-destructive/10 border border-destructive/20 rounded-md p-4 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <h3 className="text-sm font-semibold text-destructive mb-2">{title}</h3>
      <ul className="list-disc list-inside space-y-1">
        {errors.map((error, index) => (
          <li key={index} className="text-sm text-destructive/90">
            {error}
          </li>
        ))}
      </ul>
    </div>
  )
}
