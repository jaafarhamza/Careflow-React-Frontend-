import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { modalVariants, type ModalVariants } from './Modal.variants'

export interface ModalProps extends ModalVariants {
  /**
   * Whether the modal is open
   */
  open: boolean
  /**
   * Callback when the modal should close
   */
  onClose: () => void
  /**
   * Modal title
   */
  title?: string
  /**
   * Modal description
   */
  description?: string
  /**
   * Modal content
   */
  children: React.ReactNode
  /**
   * Footer content (buttons, actions)
   */
  footer?: React.ReactNode
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean
  /**
   * Whether clicking the overlay closes the modal
   * @default true
   */
  closeOnOverlayClick?: boolean
  /**
   * Whether pressing ESC closes the modal
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * Custom className for the content
   */
  className?: string
  /**
   * Custom className for the overlay
   */
  overlayClassName?: string
}

/**
 * Modal Component
 *
 * A fully accessible modal dialog with:
 * - Overlay with backdrop
 * - Close button
 * - Close on overlay click (configurable)
 * - Close on ESC key (configurable)
 * - Size variants (sm, md, lg, xl, 2xl, 3xl, 4xl, full)
 * - Focus trap (automatic)
 * - ARIA attributes (automatic)
 * - Smooth animations
 *
 * Built on top of Radix UI Dialog for maximum accessibility
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm Action"
 *   description="Are you sure you want to proceed?"
 *   size="md"
 *   footer={
 *     <>
 *       <Button variant="outline" onClick={() => setOpen(false)}>
 *         Cancel
 *       </Button>
 *       <Button onClick={handleConfirm}>
 *         Confirm
 *       </Button>
 *     </>
 *   }
 * >
 *   <p>This action cannot be undone.</p>
 * </Modal>
 * ```
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}: ModalProps) {
  // Handle overlay click
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && closeOnOverlayClick) {
      onClose()
    }
  }

  // Handle escape key
  React.useEffect(() => {
    if (!closeOnEscape || !open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeOnEscape, open, onClose])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(modalVariants({ size }), className)}
        onEscapeKeyDown={(e) => {
          if (!closeOnEscape) {
            e.preventDefault()
          }
        }}
        onPointerDownOutside={(e) => {
          if (!closeOnOverlayClick) {
            e.preventDefault()
          }
        }}
      >
        {/* Header */}
        {(title || description || showCloseButton) && (
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {title && <DialogTitle>{title}</DialogTitle>}
                {description && (
                  <DialogDescription>{description}</DialogDescription>
                )}
              </div>
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="ml-4 shrink-0"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </DialogHeader>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <DialogFooter className="flex gap-2 sm:gap-2">{footer}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Export sub-components for advanced usage
export { DialogTrigger as ModalTrigger } from '@/components/ui/dialog'
