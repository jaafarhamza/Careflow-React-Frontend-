import { cva } from 'class-variance-authority'

export const toastVariants = cva(
    'pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all animate__animated animate__fadeIn',
    {
        variants: {
            variant: {
                default: 'border bg-background text-foreground',
                destructive:
                    'destructive group border-destructive bg-destructive text-destructive-foreground',
                success: 'border-green-500 bg-green-50 text-green-900',
                warning: 'border-yellow-500 bg-yellow-50 text-yellow-900',
                info: 'border-blue-500 bg-blue-50 text-blue-900',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)
