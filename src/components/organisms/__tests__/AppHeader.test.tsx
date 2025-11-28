import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AppHeader from '../AppHeader'

describe('AppHeader', () => {
  const defaultProps = {
    onMenuClick: vi.fn(),
  }

  it('renders app name', () => {
    render(<AppHeader {...defaultProps} appName="Careflow" />)
    expect(screen.getByText('Careflow')).toBeInTheDocument()
  })

  it('renders logo when provided', () => {
    render(
      <AppHeader {...defaultProps} logoUrl="/logo.png" appName="Test App" />
    )
    const logo = screen.getByAltText('Test App')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/logo.png')
  })

  it('renders fallback logo when no URL provided', () => {
    const { container } = render(<AppHeader {...defaultProps} appName="Test" />)
    const fallbackLogo = container.querySelector('.bg-primary')
    expect(fallbackLogo).toBeInTheDocument()
    expect(fallbackLogo).toHaveTextContent('T')
  })

  it('renders search input', () => {
    render(<AppHeader {...defaultProps} />)
    const searchInput = screen.getByPlaceholderText(/search patients/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('calls onSearch when form is submitted', () => {
    const onSearch = vi.fn()
    render(<AppHeader {...defaultProps} onSearch={onSearch} />)

    const searchInput = screen.getByPlaceholderText(/search patients/i)
    fireEvent.change(searchInput, { target: { value: 'test query' } })
    fireEvent.submit(searchInput.closest('form')!)

    expect(onSearch).toHaveBeenCalledWith('test query')
  })

  it('does not call onSearch with empty query', () => {
    const onSearch = vi.fn()
    render(<AppHeader {...defaultProps} onSearch={onSearch} />)

    const searchInput = screen.getByPlaceholderText(/search patients/i)
    fireEvent.submit(searchInput.closest('form')!)

    expect(onSearch).not.toHaveBeenCalled()
  })

  it('calls onMenuClick when menu button is clicked', () => {
    const onMenuClick = vi.fn()
    render(<AppHeader {...defaultProps} onMenuClick={onMenuClick} />)

    const menuButton = screen.getByLabelText('Open sidebar')
    fireEvent.click(menuButton)

    expect(onMenuClick).toHaveBeenCalledTimes(1)
  })

  it('renders user information when provided', () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Doctor',
    }
    render(<AppHeader {...defaultProps} user={user} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders notification bell and user dropdown', () => {
    render(<AppHeader {...defaultProps} />)
    expect(screen.getByLabelText(/notifications/i)).toBeInTheDocument()
    expect(screen.getByLabelText('User menu')).toBeInTheDocument()
  })
})
