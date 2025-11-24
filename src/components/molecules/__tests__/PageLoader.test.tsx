import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PageLoader } from '../PageLoader'

describe('PageLoader', () => {
  it('renders spinner', () => {
    const { container } = render(<PageLoader />)
    // Check for spinner class
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('displays message', () => {
    render(<PageLoader message="Loading data..." />)
    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('renders full screen by default', () => {
    const { container } = render(<PageLoader />)
    expect(container.firstChild).toHaveClass('fixed inset-0')
  })

  it('renders inline when fullScreen is false', () => {
    const { container } = render(<PageLoader fullScreen={false} />)
    expect(container.firstChild).not.toHaveClass('fixed inset-0')
    expect(container.firstChild).toHaveClass('w-full h-full')
  })
})
