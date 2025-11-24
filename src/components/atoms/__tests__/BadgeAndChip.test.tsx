import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Badge } from '../index'
import { Chip } from '../Chip'

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge).toHaveClass('bg-primary')
  })

  it('renders with success variant', () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge).toHaveClass('bg-green-500')
  })

  it('renders with warning variant', () => {
    render(<Badge variant="warning">Warning</Badge>)
    const badge = screen.getByText('Warning')
    expect(badge).toHaveClass('bg-yellow-500')
  })

  it('renders with error/destructive variant', () => {
    render(<Badge variant="destructive">Error</Badge>)
    const badge = screen.getByText('Error')
    expect(badge).toHaveClass('bg-destructive')
  })

  it('renders with info variant', () => {
    render(<Badge variant="info">Info</Badge>)
    const badge = screen.getByText('Info')
    expect(badge).toHaveClass('bg-blue-500')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>)
    expect(screen.getByText('Small')).toHaveClass('text-[10px]')

    rerender(<Badge size="lg">Large</Badge>)
    expect(screen.getByText('Large')).toHaveClass('text-sm')
  })
})

describe('Chip', () => {
  it('renders with default variant', () => {
    render(<Chip>Default</Chip>)
    const chip = screen.getByText('Default')
    expect(chip).toHaveClass('bg-primary')
  })

  it('renders close button when onClose is provided', () => {
    const handleClose = vi.fn()
    render(<Chip onClose={handleClose}>Closeable</Chip>)
    expect(screen.getByLabelText('Close chip')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn()
    render(<Chip onClose={handleClose}>Closeable</Chip>)
    fireEvent.click(screen.getByLabelText('Close chip'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not render close button when onClose is missing', () => {
    render(<Chip>Static</Chip>)
    expect(screen.queryByLabelText('Close chip')).not.toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Chip size="sm">Small</Chip>)
    expect(screen.getByText('Small')).toHaveClass('text-xs')

    rerender(<Chip size="lg">Large</Chip>)
    expect(screen.getByText('Large')).toHaveClass('text-base')
  })
})
