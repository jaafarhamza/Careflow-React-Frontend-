import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import MainLayout from '../MainLayout'
import { ToastProvider } from '@/context/ToastProvider'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ToastProvider>{component}</ToastProvider>
    </BrowserRouter>
  )
}

describe('MainLayout', () => {
  it('renders sidebar, header, and footer', () => {
    renderWithProviders(<MainLayout role="admin" />)

    // Check for navigation items (from Sidebar)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()

    // Check for header elements
    expect(screen.getByLabelText('Open sidebar')).toBeInTheDocument()
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument()

    // Check for footer
    expect(
      screen.getByText(/Careflow. All rights reserved/i)
    ).toBeInTheDocument()
  })

  it('toggles sidebar when menu button is clicked', () => {
    const { container } = renderWithProviders(<MainLayout role="admin" />)
    const menuButton = screen.getByLabelText('Open sidebar')
    const aside = container.querySelector('aside')

    // Initially closed on mobile
    expect(aside).toHaveClass('-translate-x-full')

    // Click to open
    fireEvent.click(menuButton)
    expect(aside).toHaveClass('translate-x-0')

    // Click close button
    const closeButton = screen.getByLabelText('Close sidebar')
    fireEvent.click(closeButton)
    expect(aside).toHaveClass('-translate-x-full')
  })

  it('displays current year in footer', () => {
    renderWithProviders(<MainLayout role="admin" />)
    const currentYear = new Date().getFullYear()
    expect(
      screen.getByText(new RegExp(currentYear.toString()))
    ).toBeInTheDocument()
  })

  it('passes role prop to Sidebar for filtering', () => {
    renderWithProviders(<MainLayout role="doctor" />)

    // Doctor should see Dashboard and Patients
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Patients')).toBeInTheDocument()

    // But not Settings (admin only)
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
  })
})
