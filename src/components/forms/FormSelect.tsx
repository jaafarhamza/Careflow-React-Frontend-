import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import { FormError } from './FormError'

interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: FieldError
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      className = '',
      required,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${props.name}`
    const hasError = !!error

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          className={`
            w-full px-3 py-2 rounded-md border
            bg-background text-foreground
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
              ? `${selectId}-error`
              : helperText
              ? `${selectId}-helper`
              : undefined
          }
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {hasError && <FormError error={error} />}

        {!hasError && helperText && (
          <p
            id={`${selectId}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'
