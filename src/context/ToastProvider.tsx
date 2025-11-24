import React, { useCallback, useState, type ReactNode } from 'react'
import { type Toast } from '@/types/toast'
import { ToastContext } from './ToastContext'

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = crypto.randomUUID()
      const newToast = { ...toast, id }

      setToasts((prevToasts) => [...prevToasts, newToast])

      if (toast.duration !== 0) {
        setTimeout(() => {
          removeToast(id)
        }, toast.duration || 5000)
      }
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}
