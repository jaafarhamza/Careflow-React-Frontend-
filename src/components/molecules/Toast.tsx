import React from 'react'
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Toast as ToastType } from '@/types/toast'
import { toastVariants } from './toast-variants'

interface ToastProps extends ToastType {
  onDismiss: (id: string) => void
}

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  error: AlertCircle,
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  onDismiss,
}) => {
  const Icon = icons[type]

  return (
    <div
      className={cn(
        toastVariants({ variant: type === 'error' ? 'destructive' : type })
      )}
    >
      <div className="flex w-full items-start gap-4">
        {Icon && <Icon className="h-5 w-5 mt-0.5" />}
        <div className="grid gap-1">
          {title && (
            <h5 className="text-sm font-semibold leading-none tracking-tight">
              {title}
            </h5>
          )}
          <div className="text-sm opacity-90">{message}</div>
        </div>
        <button
          onClick={() => onDismiss(id)}
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
