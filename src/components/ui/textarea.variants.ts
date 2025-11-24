import { cva, type VariantProps } from 'class-variance-authority'

export const textareaVariants = cva(
    [
        // Base styles
        'border-input placeholder:text-muted-foreground',
        'focus-visible:border-ring focus-visible:ring-ring/50',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        'aria-invalid:border-destructive',
        'dark:bg-input/30',
        'flex field-sizing-content min-h-16 w-full rounded-md border',
        'bg-transparent px-3 py-2 text-base shadow-xs',
        'transition-[color,box-shadow] outline-none focus-visible:ring-[3px]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'md:text-sm',
    ],
    {
        variants: {
            variant: {
                default: '',
                error: 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
            },
            textareaSize: {
                sm: 'min-h-12 px-2.5 py-1.5 text-sm',
                default: 'min-h-16 px-3 py-2',
                lg: 'min-h-20 px-4 py-3',
            },
        },
        defaultVariants: {
            variant: 'default',
            textareaSize: 'default',
        },
    }
)

export type TextareaVariants = VariantProps<typeof textareaVariants>
