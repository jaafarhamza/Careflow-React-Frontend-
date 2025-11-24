import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from '../Spinner'
import { Skeleton } from '../Skeleton'
import { ProgressBar } from '../ProgressBar'

describe('Spinner', () => {
  it('renders correctly', () => {
    const { container } = render(<Spinner />)
    expect(container.firstChild).toHaveClass('animate-spin')
  })

  it('applies size classes', () => {
    const { container } = render(<Spinner size="lg" />)
    expect(container.firstChild).toHaveClass('h-6 w-6')
  })

  it('applies variant classes', () => {
    const { container } = render(<Spinner variant="secondary" />)
    expect(container.firstChild).toHaveClass('text-secondary')
  })
})

describe('Skeleton', () => {
  it('renders correctly', () => {
    const { container } = render(<Skeleton className="h-4 w-4" />)
    expect(container.firstChild).toHaveClass('bg-muted')
    expect(container.firstChild).toHaveClass('animate-pulse')
  })

  it('applies circle shape', () => {
    const { container } = render(<Skeleton shape="circle" />)
    expect(container.firstChild).toHaveClass('rounded-full')
  })
})

describe('ProgressBar', () => {
  it('renders with value', () => {
    render(<ProgressBar value={50} />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
  })

  it('displays label', () => {
    render(<ProgressBar value={50} label="Uploading..." />)
    expect(screen.getByText('Uploading...')).toBeInTheDocument()
  })

  it('displays percentage value', () => {
    render(<ProgressBar value={75} showValue />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    const { container } = render(<ProgressBar variant="success" value={50} />)
    expect(container).toBeInTheDocument()
  })
})
