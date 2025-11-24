import { cva, type VariantProps } from 'class-variance-authority'

export const cardVariants = cva(
    // Base styles
    'rounded-lg border bg-card text-card-foreground',
    {
        variants: {
            variant: {
                default: '',
                elevated: 'shadow-md',
                outlined: 'border-2',
            },
            shadow: {
                none: 'shadow-none',
                sm: 'shadow-sm',
                md: 'shadow-md',
                lg: 'shadow-lg',
                xl: 'shadow-xl',
            },
            hover: {
                none: '',
                lift: 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
                glow: 'transition-all duration-200 hover:shadow-xl hover:border-primary/50',
                scale: 'transition-all duration-200 hover:scale-[1.02]',
            },
        },
        defaultVariants: {
            variant: 'default',
            shadow: 'sm',
            hover: 'none',
        },
    }
)

export type CardVariants = VariantProps<typeof cardVariants>
