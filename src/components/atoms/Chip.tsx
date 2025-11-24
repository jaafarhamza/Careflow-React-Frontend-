import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

import { chipVariants } from './chip-variants'

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  onClose?: () => void
}

function Chip({
  className,
  variant,
  size,
  children,
  onClose,
  ...props
}: ChipProps) {
  return (
    <div className={cn(chipVariants({ variant, size }), className)} {...props}>
      {children}
      {onClose && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className={cn(
            'ml-1.5 rounded-full p-0.5 hover:bg-black/20 focus:outline-none',
            size === 'sm' && 'ml-1',
            size === 'lg' && 'ml-2'
          )}
          aria-label="Close chip"
        >
          <X className={cn('h-3 w-3', size === 'lg' && 'h-4 w-4')} />
        </button>
      )}
    </div>
  )
}

export { Chip }
