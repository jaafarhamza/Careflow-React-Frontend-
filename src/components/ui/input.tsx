import * as React from 'react'
import { cn } from '@/lib/utils'
import { inputVariants, type InputVariants } from './input.variants'

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    InputVariants {
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  error?: boolean
  helperText?: string
  showCharacterCount?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      inputSize,
      prefixIcon,
      suffixIcon,
      error,
      helperText,
      showCharacterCount,
      maxLength,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(0)
    const inputId = React.useId()
    const helperTextId = `${inputId}-helper`
    const errorId = `${inputId}-error`

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (showCharacterCount) {
        setCharCount(e.target.value.length)
      }
      props.onChange?.(e)
    }

    const hasIcons = prefixIcon || suffixIcon
    const finalVariant = error ? 'error' : variant

    if (hasIcons) {
      return (
        <div className="relative w-full">
          {prefixIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {prefixIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            data-slot="input"
            maxLength={maxLength}
            className={cn(
              inputVariants({ variant: finalVariant, inputSize }),
              prefixIcon && 'pl-10',
              suffixIcon && 'pr-10',
              className
            )}
            aria-invalid={error}
            aria-describedby={
              helperText || error ? `${helperTextId} ${errorId}` : undefined
            }
            onChange={handleChange}
            {...props}
          />
          {suffixIcon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {suffixIcon}
            </div>
          )}
          {(helperText || showCharacterCount) && (
            <div className="mt-1.5 flex items-center justify-between gap-2">
              {helperText && (
                <p
                  id={helperTextId}
                  className={cn(
                    'text-sm',
                    error ? 'text-destructive' : 'text-muted-foreground'
                  )}
                >
                  {helperText}
                </p>
              )}
              {showCharacterCount && maxLength && (
                <p
                  className={cn(
                    'text-sm tabular-nums',
                    charCount > maxLength
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  )}
                >
                  {charCount}/{maxLength}
                </p>
              )}
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="w-full">
        <input
          ref={ref}
          type={type}
          data-slot="input"
          maxLength={maxLength}
          className={cn(
            inputVariants({ variant: finalVariant, inputSize }),
            className
          )}
          aria-invalid={error}
          aria-describedby={
            helperText || error ? `${helperTextId} ${errorId}` : undefined
          }
          onChange={handleChange}
          {...props}
        />
        {(helperText || showCharacterCount) && (
          <div className="mt-1.5 flex items-center justify-between gap-2">
            {helperText && (
              <p
                id={helperTextId}
                className={cn(
                  'text-sm',
                  error ? 'text-destructive' : 'text-muted-foreground'
                )}
              >
                {helperText}
              </p>
            )}
            {showCharacterCount && maxLength && (
              <p
                className={cn(
                  'text-sm tabular-nums',
                  charCount > maxLength
                    ? 'text-destructive'
                    : 'text-muted-foreground'
                )}
              >
                {charCount}/{maxLength}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
