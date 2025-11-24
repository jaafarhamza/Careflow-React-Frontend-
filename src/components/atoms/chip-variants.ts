import { cva } from 'class-variance-authority'

export const chipVariants = cva(
    'inline-flex items-center justify-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground hover:bg-accent hover:text-accent-foreground',
                success:
                    'border-transparent bg-green-500 text-white hover:bg-green-600',
                warning:
                    'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
                info: 'border-transparent bg-blue-500 text-white hover:bg-blue-600',
            },
            size: {
                sm: 'text-xs px-2 py-0.5 h-6',
                md: 'text-sm px-3 py-1 h-8',
                lg: 'text-base px-4 py-1.5 h-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
)
