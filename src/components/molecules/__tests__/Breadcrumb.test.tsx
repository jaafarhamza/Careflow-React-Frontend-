import { render, screen } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Breadcrumb from '../Breadcrumb'

const renderWithRouter = (path: string) => {
  window.history.pushState({}, '', path)
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Breadcrumb />} />
      </Routes>
    </BrowserRouter>
  )
}

describe('Breadcrumb', () => {
  it('renders breadcrumb for single path segment', () => {
    renderWithRouter('/dashboard')
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders breadcrumb for multiple path segments', () => {
    renderWithRouter('/patients/123/edit')
    expect(screen.getByText('Patients')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('renders links for non-last segments', () => {
    renderWithRouter('/patients/123')
    const patientsLink = screen.getByRole('link', { name: 'Patients' })
    expect(patientsLink).toHaveAttribute('href', '/patients')
  })

  it('renders last segment as plain text', () => {
    renderWithRouter('/patients/123')
    const lastSegment = screen.getByText('123')
    expect(lastSegment.tagName).toBe('SPAN')
  })

  it('capitalizes path segments', () => {
    renderWithRouter('/settings')
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })
})
