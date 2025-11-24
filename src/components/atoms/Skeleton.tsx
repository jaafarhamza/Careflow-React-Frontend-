import { cn } from '@/lib/utils'
import { Skeleton as SkeletonPrimitive } from '@/components/ui/skeleton'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'default' | 'circle'
}

export function Skeleton({
  className,
  shape = 'default',
  ...props
}: SkeletonProps) {
  return (
    <SkeletonPrimitive
      className={cn(
        'bg-muted',
        shape === 'circle' && 'rounded-full',
        className
      )}
      {...props}
    />
  )
}
