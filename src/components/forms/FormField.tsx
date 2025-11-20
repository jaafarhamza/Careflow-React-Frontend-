import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import { FormError } from './FormError'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError
  helperText?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { label, error, helperText, className = '', required, id, ...props },
    ref
  ) => {
    const inputId = id || `field-${props.name}`
    const hasError = !!error

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-3 py-2 rounded-md border
            bg-background text-foreground
            placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              hasError
                ? 'border-destructive focus:ring-destructive'
                : 'border-input'
            }
            ${className}
          `}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          required={required}
          {...props}
        />

        {hasError && <FormError error={error} />}

        {!hasError && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'
