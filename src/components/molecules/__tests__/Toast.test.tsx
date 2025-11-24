import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Toast } from '../Toast'

describe('Toast Component', () => {
  const defaultProps = {
    id: 'test-id',
    message: 'Test Message',
    onDismiss: vi.fn(),
  }

  it('renders correctly', () => {
    render(<Toast {...defaultProps} type="info" />)
    expect(screen.getByText('Test Message')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Toast {...defaultProps} type="info" title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('calls onDismiss when close button is clicked', () => {
    render(<Toast {...defaultProps} type="info" />)
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    expect(defaultProps.onDismiss).toHaveBeenCalledWith('test-id')
  })

  it('renders different variants', () => {
    const { rerender } = render(<Toast {...defaultProps} type="success" />)
    expect(
      screen.getByText('Test Message').parentElement?.parentElement
        ?.parentElement
    ).toHaveClass('border-green-500')

    rerender(<Toast {...defaultProps} type="error" />)
    expect(
      screen.getByText('Test Message').parentElement?.parentElement
        ?.parentElement
    ).toHaveClass('destructive')
  })
})
