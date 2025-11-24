import { cva, type VariantProps } from 'class-variance-authority'

export const inputVariants = cva(
    [
        // Base styles
        'file:text-foreground placeholder:text-muted-foreground',
        'selection:bg-primary selection:text-primary-foreground',
        'dark:bg-input/30 border-input',
        'h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1',
        'text-base shadow-xs transition-[color,box-shadow] outline-none',
        // File input styles
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent',
        'file:text-sm file:font-medium',
        // Disabled styles
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        // Focus styles
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        // Error styles
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        'aria-invalid:border-destructive',
        // Text size
        'md:text-sm',
    ],
    {
        variants: {
            variant: {
                default: '',
                error: 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
            },
            inputSize: {
                sm: 'h-8 px-2.5 py-1 text-sm',
                default: 'h-9 px-3 py-1',
                lg: 'h-10 px-4 py-2',
            },
        },
        defaultVariants: {
            variant: 'default',
            inputSize: 'default',
        },
    }
)

export type InputVariants = VariantProps<typeof inputVariants>
