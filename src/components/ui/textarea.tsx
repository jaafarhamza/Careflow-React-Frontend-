import * as React from 'react'
import { cn } from '@/lib/utils'
import { textareaVariants, type TextareaVariants } from './textarea.variants'

export interface TextareaProps
  extends Omit<React.ComponentProps<'textarea'>, 'size'>,
    TextareaVariants {
  error?: boolean
  helperText?: string
  showCharacterCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      textareaSize,
      error,
      helperText,
      showCharacterCount,
      maxLength,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(0)
    const textareaId = React.useId()
    const helperTextId = `${textareaId}-helper`
    const errorId = `${textareaId}-error`

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (showCharacterCount) {
        setCharCount(e.target.value.length)
      }
      props.onChange?.(e)
    }

    const finalVariant = error ? 'error' : variant

    return (
      <div className="w-full">
        <textarea
          ref={ref}
          data-slot="textarea"
          maxLength={maxLength}
          className={cn(
            textareaVariants({ variant: finalVariant, textareaSize }),
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

Textarea.displayName = 'Textarea'

export { Textarea }
