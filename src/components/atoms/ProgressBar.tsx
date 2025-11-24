import * as React from 'react'
import { Progress as ProgressPrimitive } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const progressBarVariants = cva('w-full', {
  variants: {
    variant: {
      default: '[&>div]:bg-primary',
      success: '[&>div]:bg-green-500',
      warning: '[&>div]:bg-yellow-500',
      error: '[&>div]:bg-destructive',
    },
    size: {
      default: 'h-4',
      sm: 'h-2',
      lg: 'h-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ProgressBarProps
  extends React.ComponentProps<typeof ProgressPrimitive>,
    VariantProps<typeof progressBarVariants> {
  /**
   * Optional label to display above the progress bar
   */
  label?: string
  /**
   * Whether to show the percentage value
   */
  showValue?: boolean
}

export function ProgressBar({
  value,
  className,
  variant,
  size,
  label,
  showValue,
  ...props
}: ProgressBarProps) {
  return (
    <div className="w-full space-y-1">
      {(label || showValue) && (
        <div className="flex justify-between text-sm text-muted-foreground">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(value || 0)}%</span>}
        </div>
      )}
      <ProgressPrimitive
        value={value}
        className={cn(progressBarVariants({ variant, size }), className)}
        {...props}
      />
    </div>
  )
}
