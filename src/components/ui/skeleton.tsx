import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'default' | 'circle'
}

function Skeleton({ className, shape = 'default', ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'bg-accent animate-pulse rounded-md',
        shape === 'circle' && 'rounded-full',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
