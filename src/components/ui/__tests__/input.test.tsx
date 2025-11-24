import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from '../input'
import { Mail, Search } from 'lucide-react'

describe('Input', () => {
  describe('Rendering', () => {
    it('renders basic input', () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('renders all input types', () => {
      const types = ['text', 'email', 'password', 'number', 'tel'] as const
      types.forEach((type) => {
        const { container } = render(<Input type={type} data-testid={type} />)
        const input = container.querySelector(`input[type="${type}"]`)
        expect(input).toBeInTheDocument()
      })
    })

    it('renders all sizes', () => {
      const { rerender } = render(<Input inputSize="sm" />)
      expect(screen.getByRole('textbox')).toHaveClass('h-8')

      rerender(<Input inputSize="default" />)
      expect(screen.getByRole('textbox')).toHaveClass('h-9')

      rerender(<Input inputSize="lg" />)
      expect(screen.getByRole('textbox')).toHaveClass('h-10')
    })

    it('renders with prefix icon', () => {
      render(
        <Input
          prefixIcon={<Mail data-testid="prefix-icon" />}
          placeholder="Email"
        />
      )
      expect(screen.getByTestId('prefix-icon')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Email')).toHaveClass('pl-10')
    })

    it('renders with suffix icon', () => {
      render(
        <Input
          suffixIcon={<Search data-testid="suffix-icon" />}
          placeholder="Search"
        />
      )
      expect(screen.getByTestId('suffix-icon')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Search')).toHaveClass('pr-10')
    })

    it('renders with both prefix and suffix icons', () => {
      render(
        <Input
          prefixIcon={<Mail data-testid="prefix-icon" />}
          suffixIcon={<Search data-testid="suffix-icon" />}
          placeholder="Email"
        />
      )
      expect(screen.getByTestId('prefix-icon')).toBeInTheDocument()
      expect(screen.getByTestId('suffix-icon')).toBeInTheDocument()
    })
  })

  describe('Helper Text', () => {
    it('renders helper text', () => {
      render(<Input helperText="This is a helper text" />)
      expect(screen.getByText('This is a helper text')).toBeInTheDocument()
    })

    it('links helper text with aria-describedby', () => {
      render(<Input helperText="Helper text" placeholder="Input" />)
      const input = screen.getByPlaceholderText('Input')
      const helperText = screen.getByText('Helper text')
      expect(input).toHaveAttribute('aria-describedby')
      expect(helperText).toHaveAttribute('id')
    })
  })

  describe('Error State', () => {
    it('applies error variant when error prop is true', () => {
      render(<Input error placeholder="Input" />)
      expect(screen.getByPlaceholderText('Input')).toHaveAttribute(
        'aria-invalid',
        'true'
      )
    })

    it('shows error message with error styling', () => {
      render(<Input error helperText="This field is required" />)
      const errorMessage = screen.getByText('This field is required')
      expect(errorMessage).toHaveClass('text-destructive')
    })
  })

  describe('Character Counter', () => {
    it('shows character counter when enabled', () => {
      render(<Input showCharacterCount maxLength={50} />)
      expect(screen.getByText('0/50')).toBeInTheDocument()
    })

    it('updates character count on input', async () => {
      const user = userEvent.setup()
      render(<Input showCharacterCount maxLength={50} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'Hello')

      expect(screen.getByText('5/50')).toBeInTheDocument()
    })

    it('shows character count at max length', async () => {
      const user = userEvent.setup()
      render(<Input showCharacterCount maxLength={5} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'Hello World')

      // maxLength prevents exceeding, so it stops at 5
      expect(screen.getByText('5/5')).toBeInTheDocument()
    })

    it('does not show counter without maxLength', () => {
      render(<Input showCharacterCount />)
      expect(screen.queryByText(/\//)).not.toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Input disabled placeholder="Disabled" />)
      expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
    })

    it('applies disabled styles', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toHaveClass('disabled:opacity-50')
    })
  })

  describe('Interactions', () => {
    it('handles onChange events', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<Input onChange={handleChange} />)
      const input = screen.getByRole('textbox')

      await user.type(input, 'test')

      expect(handleChange).toHaveBeenCalled()
    })

    it('respects maxLength attribute', async () => {
      const user = userEvent.setup()
      render(<Input maxLength={5} />)

      const input = screen.getByRole('textbox') as HTMLInputElement
      await user.type(input, 'Hello World')

      expect(input.value).toHaveLength(5)
    })
  })

  describe('Accessibility', () => {
    it('has correct aria-invalid when error is true', () => {
      render(<Input error />)
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-invalid',
        'true'
      )
    })

    it('has aria-describedby when helper text is present', () => {
      render(<Input helperText="Helper" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby')
    })

    it('supports custom aria attributes', () => {
      render(<Input aria-label="Custom label" />)
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument()
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = vi.fn()
      render(<Input ref={ref} />)
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(<Input className="custom-class" />)
      expect(screen.getByRole('textbox')).toHaveClass('custom-class')
    })
  })
})
