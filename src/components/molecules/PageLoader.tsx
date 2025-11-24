import { Spinner, type SpinnerProps } from '@/components/atoms/Spinner'
import { cn } from '@/lib/utils'

interface PageLoaderProps extends SpinnerProps {
  message?: string
  fullScreen?: boolean
}

export function PageLoader({
  message,
  fullScreen = true,
  className,
  size = 'xl',
  ...props
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm',
        fullScreen ? 'fixed inset-0 z-50' : 'w-full h-full min-h-[200px]',
        className
      )}
    >
      <Spinner size={size} {...props} />
      {message && (
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}
