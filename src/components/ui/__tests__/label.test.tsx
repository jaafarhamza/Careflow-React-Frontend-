import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from '../label'

describe('Label', () => {
  describe('Rendering', () => {
    it('renders label text', () => {
      render(<Label>Email Address</Label>)
      expect(screen.getByText('Email Address')).toBeInTheDocument()
    })

    it('renders required indicator when required prop is true', () => {
      render(<Label required>Username</Label>)
      expect(screen.getByText('*')).toBeInTheDocument()
      expect(screen.getByLabelText('required')).toBeInTheDocument()
    })

    it('does not render required indicator by default', () => {
      render(<Label>Username</Label>)
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })
  })

  describe('Error State', () => {
    it('applies error styling when error prop is true', () => {
      render(<Label error>Email</Label>)
      expect(screen.getByText('Email')).toHaveClass('text-destructive')
    })

    it('does not apply error styling by default', () => {
      render(<Label>Email</Label>)
      expect(screen.getByText('Email')).not.toHaveClass('text-destructive')
    })
  })

  describe('Accessibility', () => {
    it('associates with input using htmlFor', () => {
      render(
        <div>
          <Label htmlFor="email">Email</Label>
          <input id="email" />
        </div>
      )
      const label = screen.getByText('Email')
      expect(label).toHaveAttribute('for', 'email')
    })

    it('supports custom aria attributes', () => {
      render(<Label aria-label="Custom label">Text</Label>)
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument()
    })
  })

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(<Label className="custom-class">Label</Label>)
      expect(screen.getByText('Label')).toHaveClass('custom-class')
    })

    it('merges custom className with default classes', () => {
      render(<Label className="custom-class">Label</Label>)
      const label = screen.getByText('Label')
      expect(label).toHaveClass('custom-class')
      expect(label).toHaveClass('text-sm')
    })
  })
})
