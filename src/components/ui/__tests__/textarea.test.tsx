import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Textarea } from '../textarea'

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders basic textarea', () => {
      render(<Textarea placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('renders all sizes', () => {
      const { rerender } = render(<Textarea textareaSize="sm" />)
      expect(screen.getByRole('textbox')).toHaveClass('min-h-12')

      rerender(<Textarea textareaSize="default" />)
      expect(screen.getByRole('textbox')).toHaveClass('min-h-16')

      rerender(<Textarea textareaSize="lg" />)
      expect(screen.getByRole('textbox')).toHaveClass('min-h-20')
    })
  })

  describe('Helper Text', () => {
    it('renders helper text', () => {
      render(<Textarea helperText="This is a helper text" />)
      expect(screen.getByText('This is a helper text')).toBeInTheDocument()
    })

    it('links helper text with aria-describedby', () => {
      render(<Textarea helperText="Helper text" placeholder="Textarea" />)
      const textarea = screen.getByPlaceholderText('Textarea')
      const helperText = screen.getByText('Helper text')
      expect(textarea).toHaveAttribute('aria-describedby')
      expect(helperText).toHaveAttribute('id')
    })
  })

  describe('Error State', () => {
    it('applies error variant when error prop is true', () => {
      render(<Textarea error placeholder="Textarea" />)
      expect(screen.getByPlaceholderText('Textarea')).toHaveAttribute(
        'aria-invalid',
        'true'
      )
    })

    it('shows error message with error styling', () => {
      render(<Textarea error helperText="This field is required" />)
      const errorMessage = screen.getByText('This field is required')
      expect(errorMessage).toHaveClass('text-destructive')
    })
  })

  describe('Character Counter', () => {
    it('shows character counter when enabled', () => {
      render(<Textarea showCharacterCount maxLength={200} />)
      expect(screen.getByText('0/200')).toBeInTheDocument()
    })

    it('updates character count on input', async () => {
      const user = userEvent.setup()
      render(<Textarea showCharacterCount maxLength={200} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Hello World')

      expect(screen.getByText('11/200')).toBeInTheDocument()
    })

    it('shows character count at max length', async () => {
      const user = userEvent.setup()
      render(<Textarea showCharacterCount maxLength={10} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Hello World!')

      // maxLength prevents exceeding, so it stops at 10
      expect(screen.getByText('10/10')).toBeInTheDocument()
    })

    it('does not show counter without maxLength', () => {
      render(<Textarea showCharacterCount />)
      expect(screen.queryByText(/\//)).not.toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Textarea disabled placeholder="Disabled" />)
      expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
    })

    it('applies disabled styles', () => {
      render(<Textarea disabled />)
      expect(screen.getByRole('textbox')).toHaveClass('disabled:opacity-50')
    })
  })

  describe('Interactions', () => {
    it('handles onChange events', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<Textarea onChange={handleChange} />)
      const textarea = screen.getByRole('textbox')

      await user.type(textarea, 'test')

      expect(handleChange).toHaveBeenCalled()
    })

    it('respects maxLength attribute', async () => {
      const user = userEvent.setup()
      render(<Textarea maxLength={10} />)

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      await user.type(textarea, 'Hello World!')

      expect(textarea.value).toHaveLength(10)
    })
  })

  describe('Accessibility', () => {
    it('has correct aria-invalid when error is true', () => {
      render(<Textarea error />)
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-invalid',
        'true'
      )
    })

    it('has aria-describedby when helper text is present', () => {
      render(<Textarea helperText="Helper" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby')
    })

    it('supports custom aria attributes', () => {
      render(<Textarea aria-label="Custom label" />)
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument()
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref to textarea element', () => {
      const ref = vi.fn()
      render(<Textarea ref={ref} />)
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(<Textarea className="custom-class" />)
      expect(screen.getByRole('textbox')).toHaveClass('custom-class')
    })
  })
})
