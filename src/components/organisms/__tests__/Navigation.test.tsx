import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Navigation from '../Navigation'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Navigation', () => {
  describe('Role-based filtering', () => {
    it('shows all items for admin role', () => {
      renderWithRouter(<Navigation role="admin" />)
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Patients')).toBeInTheDocument()
      expect(screen.getByText('Medical Records')).toBeInTheDocument()
      expect(screen.getByText('Administration')).toBeInTheDocument()
    })

    it('filters items for doctor role', () => {
      renderWithRouter(<Navigation role="doctor" />)
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Patients')).toBeInTheDocument()
      expect(screen.getByText('Medical Records')).toBeInTheDocument()
      expect(screen.queryByText('Administration')).not.toBeInTheDocument()
    })

    it('filters items for nurse role', () => {
      renderWithRouter(<Navigation role="nurse" />)
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Patients')).toBeInTheDocument()
      expect(screen.queryByText('Medical Records')).not.toBeInTheDocument()
      expect(screen.queryByText('Administration')).not.toBeInTheDocument()
    })

    it('shows only public items for user role', () => {
      renderWithRouter(<Navigation role="user" />)
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Messages')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
      expect(screen.queryByText('Patients')).not.toBeInTheDocument()
    })
  })

  describe('Nested menu items', () => {
    it('renders parent items with expand icon', () => {
      renderWithRouter(<Navigation role="admin" />)
      const patientsButton = screen.getByRole('button', { name: /Patients/i })
      expect(patientsButton).toBeInTheDocument()
    })

    it('expands nested items when parent is clicked', () => {
      renderWithRouter(<Navigation role="admin" />)
      const patientsButton = screen.getByRole('button', { name: /Patients/i })

      // Click to expand
      fireEvent.click(patientsButton)

      // Should be in document
      expect(screen.getByText('All Patients')).toBeInTheDocument()
      expect(screen.getByText('Add Patient')).toBeInTheDocument()
      expect(screen.getByText('Appointments')).toBeInTheDocument()
    })

    it('filters nested items by role', () => {
      renderWithRouter(<Navigation role="nurse" />)
      const patientsButton = screen.getByRole('button', { name: /Patients/i })
      fireEvent.click(patientsButton)

      // Nurse should see All Patients and Appointments
      expect(screen.getByText('All Patients')).toBeInTheDocument()
      expect(screen.getByText('Appointments')).toBeInTheDocument()

      // But not Add Patient (admin/doctor only)
      expect(screen.queryByText('Add Patient')).not.toBeInTheDocument()
    })
  })

  describe('Active state highlighting', () => {
    it('highlights active route', () => {
      window.history.pushState({}, '', '/dashboard')
      renderWithRouter(<Navigation role="admin" />)

      const dashboardLink = screen.getByRole('link', { name: /Dashboard/i })
      expect(dashboardLink).toHaveClass('bg-muted')
      expect(dashboardLink).toHaveClass('font-semibold')
    })

    it('highlights parent when child route is active', () => {
      window.history.pushState({}, '', '/patients/new')
      renderWithRouter(<Navigation role="admin" />)

      const patientsButton = screen.getByRole('button', { name: /Patients/i })
      expect(patientsButton).toHaveClass('bg-muted')
    })
  })

  describe('Navigation callback', () => {
    it('calls onNavigate when link is clicked', () => {
      const onNavigate = vi.fn()
      renderWithRouter(<Navigation role="admin" onNavigate={onNavigate} />)

      const dashboardLink = screen.getByRole('link', { name: /Dashboard/i })
      fireEvent.click(dashboardLink)

      expect(onNavigate).toHaveBeenCalledTimes(1)
    })

    it('calls onNavigate when nested link is clicked', () => {
      const onNavigate = vi.fn()
      renderWithRouter(<Navigation role="admin" onNavigate={onNavigate} />)

      // Expand Patients menu
      const patientsButton = screen.getByRole('button', { name: /Patients/i })
      fireEvent.click(patientsButton)

      // Click nested link
      const allPatientsLink = screen.getByRole('link', {
        name: /All Patients/i,
      })
      fireEvent.click(allPatientsLink)

      expect(onNavigate).toHaveBeenCalledTimes(1)
    })
  })

  describe('Icons', () => {
    it('renders icons for menu items', () => {
      const { container } = renderWithRouter(<Navigation role="admin" />)
      const icons = container.querySelectorAll('svg')
      expect(icons.length).toBeGreaterThan(0)
    })
  })
})
