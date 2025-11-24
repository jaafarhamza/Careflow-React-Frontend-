import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from '../Modal'
import { Button } from '@/components/ui/button'

describe('Modal', () => {
  describe('Rendering', () => {
    it('renders when open is true', () => {
      render(
        <Modal open={true} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      )
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    it('does not render when open is false', () => {
      render(
        <Modal open={false} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      )
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
    })

    it('renders title when provided', () => {
      render(
        <Modal open={true} onClose={vi.fn()} title="Test Title">
          <p>Content</p>
        </Modal>
      )
      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('renders description when provided', () => {
      render(
        <Modal
          open={true}
          onClose={vi.fn()}
          title="Title"
          description="Test Description"
        >
          <p>Content</p>
        </Modal>
      )
      expect(screen.getByText('Test Description')).toBeInTheDocument()
    })

    it('renders footer when provided', () => {
      render(
        <Modal
          open={true}
          onClose={vi.fn()}
          title="Title"
          footer={<Button>Action</Button>}
        >
          <p>Content</p>
        </Modal>
      )
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
    })
  })

  describe('Close Button', () => {
    it('shows close button by default', () => {
      render(
        <Modal open={true} onClose={vi.fn()} title="Title">
          <p>Content</p>
        </Modal>
      )
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
    })

    it('hides close button when showCloseButton is false', () => {
      render(
        <Modal
          open={true}
          onClose={vi.fn()}
          title="Title"
          showCloseButton={false}
        >
          <p>Content</p>
        </Modal>
      )
      expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', async () => {
      const handleClose = vi.fn()
      const user = userEvent.setup()

      render(
        <Modal open={true} onClose={handleClose} title="Title">
          <p>Content</p>
        </Modal>
      )

      await user.click(screen.getByLabelText('Close modal'))
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Size Variants', () => {
    it('applies small size class', () => {
      render(
        <Modal open={true} onClose={vi.fn()} size="sm">
          <p>Content</p>
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('max-w-sm')
    })

    it('applies medium size class (default)', () => {
      render(
        <Modal open={true} onClose={vi.fn()}>
          <p>Content</p>
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('max-w-md')
    })

    it('applies large size class', () => {
      render(
        <Modal open={true} onClose={vi.fn()} size="lg">
          <p>Content</p>
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('max-w-lg')
    })

    it('applies fullscreen size class', () => {
      render(
        <Modal open={true} onClose={vi.fn()} size="full">
          <p>Content</p>
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('max-w-full')
    })
  })

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(
        <Modal open={true} onClose={vi.fn()} title="Title">
          <p>Content</p>
        </Modal>
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('has aria-labelledby when title is provided', () => {
      render(
        <Modal open={true} onClose={vi.fn()} title="Test Title">
          <p>Content</p>
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-labelledby')
    })

    it('has aria-describedby when description is provided', () => {
      render(
        <Modal
          open={true}
          onClose={vi.fn()}
          title="Title"
          description="Description"
        >
          <p>Content</p>
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-describedby')
    })
  })

  describe('Escape Key', () => {
    it('closes on escape key by default', async () => {
      const handleClose = vi.fn()
      const user = userEvent.setup()

      render(
        <Modal open={true} onClose={handleClose} title="Title">
          <p>Content</p>
        </Modal>
      )

      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled()
      })
    })

    it('does not close on escape when closeOnEscape is false', async () => {
      const handleClose = vi.fn()
      const user = userEvent.setup()

      render(
        <Modal
          open={true}
          onClose={handleClose}
          title="Title"
          closeOnEscape={false}
        >
          <p>Content</p>
        </Modal>
      )

      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(handleClose).not.toHaveBeenCalled()
      })
    })
  })

  describe('Custom className', () => {
    it('applies custom className to content', () => {
      render(
        <Modal open={true} onClose={vi.fn()} className="custom-class">
          <p>Content</p>
        </Modal>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('custom-class')
    })
  })
})
