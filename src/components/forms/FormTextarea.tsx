import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import { FormError } from './FormError'

interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: FieldError
  helperText?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      label,
      error,
      helperText,
      className = '',
      required,
      id,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${props.name}`
    const hasError = !!error

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`
            w-full px-3 py-2 rounded-md border
            bg-background text-foreground
            placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            resize-y
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
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          required={required}
          {...props}
        />

        {hasError && <FormError error={error} />}

        {!hasError && helperText && (
          <p
            id={`${textareaId}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'
