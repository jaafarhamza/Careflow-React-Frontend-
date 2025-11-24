import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Sidebar from '../Sidebar'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Sidebar', () => {
  it('renders navigation items', () => {
    renderWithRouter(<Sidebar role="admin" open={true} onClose={() => {}} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Patients')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('filters navigation by role - doctor', () => {
    renderWithRouter(<Sidebar role="doctor" open={true} onClose={() => {}} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Patients')).toBeInTheDocument()
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
  })

  it('filters navigation by role - user', () => {
    renderWithRouter(<Sidebar role="user" open={true} onClose={() => {}} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.queryByText('Patients')).not.toBeInTheDocument()
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
  })

  it('applies open class when open prop is true', () => {
    const { container } = renderWithRouter(
      <Sidebar role="admin" open={true} onClose={() => {}} />
    )
    const aside = container.querySelector('aside')
    expect(aside).toHaveClass('translate-x-0')
  })

  it('applies closed class when open prop is false', () => {
    const { container } = renderWithRouter(
      <Sidebar role="admin" open={false} onClose={() => {}} />
    )
    const aside = container.querySelector('aside')
    expect(aside).toHaveClass('-translate-x-full')
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    renderWithRouter(<Sidebar role="admin" open={true} onClose={onClose} />)
    const closeButton = screen.getByLabelText('Close sidebar')
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
