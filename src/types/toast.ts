export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastPosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'

export interface Toast {
    id: string
    type: ToastType
    title?: string
    message: string
    duration?: number
    position?: ToastPosition
}

export interface ToastContextType {
    toasts: Toast[]
    addToast: (toast: Omit<Toast, 'id'>) => void
    removeToast: (id: string) => void
}
