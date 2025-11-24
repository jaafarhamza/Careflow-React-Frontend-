import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Header from '../Header'
import { ToastProvider } from '@/context/ToastProvider'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ToastProvider>{component}</ToastProvider>
    </BrowserRouter>
  )
}

describe('Header', () => {
  it('renders menu button', () => {
    renderWithProviders(<Header onMenuClick={() => {}} />)
    expect(screen.getByLabelText('Open sidebar')).toBeInTheDocument()
  })

  it('renders notifications button', () => {
    renderWithProviders(<Header onMenuClick={() => {}} />)
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument()
  })

  it('renders UserMenu component', () => {
    renderWithProviders(<Header onMenuClick={() => {}} />)
    // UserMenu renders an avatar with fallback "U"
    expect(screen.getByText('U')).toBeInTheDocument()
  })

  it('calls onMenuClick when menu button is clicked', () => {
    const onMenuClick = vi.fn()
    renderWithProviders(<Header onMenuClick={onMenuClick} />)
    const menuButton = screen.getByLabelText('Open sidebar')
    fireEvent.click(menuButton)
    expect(onMenuClick).toHaveBeenCalledTimes(1)
  })
})
