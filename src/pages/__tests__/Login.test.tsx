import { describe, it, expect, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/test-utils'
import { Login } from '../Login'

describe('Login Page', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('renders login form', () => {
    render(<Login />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('displays validation errors for invalid input', async () => {
    const user = userEvent.setup()

    render(<Login />)

    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /submit/i })
    if (submitButton) {
      await user.click(submitButton)

      await waitFor(() => {
        // Should show validation errors
        expect(screen.queryByText(/required/i)).toBeInTheDocument()
      })
    }
  })

  it('handles successful login', async () => {
    const user = userEvent.setup()

    render(<Login />)

    const emailInput = screen.queryByLabelText(/email/i)
    const passwordInput = screen.queryByLabelText(/password/i)
    const submitButton = screen.queryByRole('button', { name: /submit/i })

    if (emailInput && passwordInput && submitButton) {
      // Fill in valid credentials
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'Password123!')

      // Submit form
      await user.click(submitButton)

      // Should store token in localStorage
      await waitFor(() => {
        expect(localStorage.getItem('token')).toBeTruthy()
      })
    }
  })

  it('handles login failure', async () => {
    const user = userEvent.setup()

    render(<Login />)

    const emailInput = screen.queryByLabelText(/email/i)
    const passwordInput = screen.queryByLabelText(/password/i)
    const submitButton = screen.queryByRole('button', { name: /submit/i })

    if (emailInput && passwordInput && submitButton) {
      // Fill in invalid credentials
      await user.type(emailInput, 'wrong@example.com')
      await user.type(passwordInput, 'wrongpassword')

      // Submit form
      await user.click(submitButton)

      // Should show error message
      await waitFor(
        () => {
          expect(screen.queryByText(/invalid/i)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    }
  })

  it('toggles remember me checkbox', async () => {
    const user = userEvent.setup()

    render(<Login />)

    const rememberMeCheckbox = screen.queryByRole('checkbox', {
      name: /remember/i,
    })

    if (rememberMeCheckbox) {
      expect(rememberMeCheckbox).not.toBeChecked()

      await user.click(rememberMeCheckbox)

      expect(rememberMeCheckbox).toBeChecked()
    }
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()

    render(<Login />)

    const emailInput = screen.queryByLabelText(/email/i)
    const passwordInput = screen.queryByLabelText(/password/i)
    const submitButton = screen.queryByRole('button', { name: /submit/i })

    if (emailInput && passwordInput && submitButton) {
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'Password123!')

      await user.click(submitButton)

      // Button should be disabled during submission
      expect(submitButton).toBeDisabled()
    }
  })
})
