import { cva, type VariantProps } from 'class-variance-authority'

export const modalVariants = cva(
    // Base styles are handled by Dialog, these are for content sizing
    '',
    {
        variants: {
            size: {
                sm: 'max-w-sm',
                md: 'max-w-md',
                lg: 'max-w-lg',
                xl: 'max-w-xl',
                '2xl': 'max-w-2xl',
                '3xl': 'max-w-3xl',
                '4xl': 'max-w-4xl',
                full: 'max-w-full w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
)

export type ModalVariants = VariantProps<typeof modalVariants>
