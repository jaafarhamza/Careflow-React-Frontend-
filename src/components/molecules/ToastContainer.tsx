import React from 'react'
import { useToast } from '@/hooks/useToast'
import { Toast } from './Toast'
import { type ToastPosition } from '@/types/toast'

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast()

  const getToastsByPosition = (position: ToastPosition) => {
    return toasts.filter(
      (toast) => (toast.position || 'top-right') === position
    )
  }

  const positions: ToastPosition[] = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ]

  const positionClasses: Record<ToastPosition, string> = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  }

  return (
    <>
      {positions.map((position) => {
        const positionToasts = getToastsByPosition(position)
        if (positionToasts.length === 0) return null

        return (
          <div
            key={position}
            className={`fixed z-50 flex w-full max-w-[420px] p-4 gap-2 ${
              positionClasses[position]
            } ${position.includes('top') ? 'flex-col-reverse' : 'flex-col'}`}
          >
            {positionToasts.map((toast) => (
              <Toast key={toast.id} {...toast} onDismiss={removeToast} />
            ))}
          </div>
        )
      })}
    </>
  )
}
