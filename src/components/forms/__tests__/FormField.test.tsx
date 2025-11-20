import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/test-utils'
import { FormField } from '../FormField'

describe('FormField', () => {
  it('renders with label', () => {
    render(<FormField label="Email" type="email" name="email" />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('displays error message when error prop is provided', () => {
    const error = { type: 'required', message: 'Email is required' }

    render(<FormField label="Email" type="email" name="email" error={error} />)

    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  it('shows required indicator when required prop is true', () => {
    render(<FormField label="Email" type="email" name="email" required />)

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('displays helper text when provided', () => {
    render(
      <FormField
        label="Email"
        type="email"
        name="email"
        helperText="We'll never share your email"
      />
    )

    expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
  })

  it('applies error styling when error is present', () => {
    const error = { type: 'required', message: 'Email is required' }

    render(<FormField label="Email" type="email" name="email" error={error} />)

    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('handles user input', async () => {
    const user = userEvent.setup()

    render(<FormField label="Email" type="email" name="email" />)

    const input = screen.getByLabelText('Email') as HTMLInputElement
    await user.type(input, 'test@example.com')

    expect(input.value).toBe('test@example.com')
  })

  it('is disabled when disabled prop is true', () => {
    render(<FormField label="Email" type="email" name="email" disabled />)

    const input = screen.getByLabelText('Email')
    expect(input).toBeDisabled()
  })

  it('has proper accessibility attributes', () => {
    const error = { type: 'required', message: 'Email is required' }

    render(
      <FormField
        label="Email"
        type="email"
        name="email"
        id="email-field"
        error={error}
      />
    )

    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby')
  })
})
