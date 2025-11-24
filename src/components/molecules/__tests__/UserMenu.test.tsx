import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import UserMenu from '../UserMenu'
import { ToastProvider } from '@/context/ToastProvider'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ToastProvider>{component}</ToastProvider>
    </BrowserRouter>
  )
}

describe('UserMenu', () => {
  it('renders avatar button', () => {
    renderWithProviders(<UserMenu />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders avatar fallback', () => {
    renderWithProviders(<UserMenu />)
    expect(screen.getByText('U')).toBeInTheDocument()
  })
})
