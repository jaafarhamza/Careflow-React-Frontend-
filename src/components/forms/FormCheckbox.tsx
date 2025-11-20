import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import { FormError } from './FormError'

interface FormCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: FieldError
  description?: string
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, error, description, className = '', id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${props.name}`
    const hasError = !!error

    return (
      <div className="space-y-2">
        <div className="flex items-start">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={`
              h-4 w-4 mt-0.5 rounded border-input
              text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              ${hasError ? 'border-destructive' : ''}
              ${className}
            `}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${checkboxId}-error`
                : description
                ? `${checkboxId}-description`
                : undefined
            }
            {...props}
          />

          <div className="ml-3 flex-1">
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-foreground cursor-pointer"
            >
              {label}
            </label>

            {description && !hasError && (
              <p
                id={`${checkboxId}-description`}
                className="text-sm text-muted-foreground"
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {hasError && <FormError error={error} />}
      </div>
    )
  }
)

FormCheckbox.displayName = 'FormCheckbox'
