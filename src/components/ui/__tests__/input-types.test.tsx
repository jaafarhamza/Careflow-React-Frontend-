import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Input } from '../input'

describe('Input - All HTML5 Types Support', () => {
  describe('Text-based input types', () => {
    it('supports text type', () => {
      const { container } = render(
        <Input type="text" data-testid="text-input" />
      )
      expect(container.querySelector('input[type="text"]')).toBeInTheDocument()
    })

    it('supports email type', () => {
      const { container } = render(
        <Input type="email" data-testid="email-input" />
      )
      expect(container.querySelector('input[type="email"]')).toBeInTheDocument()
    })

    it('supports password type', () => {
      const { container } = render(
        <Input type="password" data-testid="password-input" />
      )
      expect(
        container.querySelector('input[type="password"]')
      ).toBeInTheDocument()
    })

    it('supports tel type', () => {
      const { container } = render(<Input type="tel" data-testid="tel-input" />)
      expect(container.querySelector('input[type="tel"]')).toBeInTheDocument()
    })

    it('supports url type', () => {
      const { container } = render(<Input type="url" data-testid="url-input" />)
      expect(container.querySelector('input[type="url"]')).toBeInTheDocument()
    })

    it('supports search type', () => {
      const { container } = render(
        <Input type="search" data-testid="search-input" />
      )
      expect(
        container.querySelector('input[type="search"]')
      ).toBeInTheDocument()
    })
  })

  describe('Numeric input types', () => {
    it('supports number type', () => {
      const { container } = render(
        <Input type="number" data-testid="number-input" />
      )
      expect(
        container.querySelector('input[type="number"]')
      ).toBeInTheDocument()
    })

    it('supports range type', () => {
      const { container } = render(<Input type="range" min={0} max={100} />)
      expect(container.querySelector('input[type="range"]')).toBeInTheDocument()
    })
  })

  describe('Date and time input types', () => {
    it('supports date type', () => {
      const { container } = render(<Input type="date" />)
      expect(container.querySelector('input[type="date"]')).toBeInTheDocument()
    })

    it('supports datetime-local type', () => {
      const { container } = render(<Input type="datetime-local" />)
      expect(
        container.querySelector('input[type="datetime-local"]')
      ).toBeInTheDocument()
    })

    it('supports time type', () => {
      const { container } = render(<Input type="time" />)
      expect(container.querySelector('input[type="time"]')).toBeInTheDocument()
    })

    it('supports week type', () => {
      const { container } = render(<Input type="week" />)
      expect(container.querySelector('input[type="week"]')).toBeInTheDocument()
    })

    it('supports month type', () => {
      const { container } = render(<Input type="month" />)
      expect(container.querySelector('input[type="month"]')).toBeInTheDocument()
    })
  })

  describe('Selection input types', () => {
    it('supports checkbox type', () => {
      const { container } = render(<Input type="checkbox" />)
      expect(
        container.querySelector('input[type="checkbox"]')
      ).toBeInTheDocument()
    })

    it('supports radio type', () => {
      const { container } = render(<Input type="radio" />)
      expect(container.querySelector('input[type="radio"]')).toBeInTheDocument()
    })

    it('supports color type', () => {
      const { container } = render(<Input type="color" />)
      expect(container.querySelector('input[type="color"]')).toBeInTheDocument()
    })
  })

  describe('File input type', () => {
    it('supports file type', () => {
      const { container } = render(<Input type="file" />)
      expect(container.querySelector('input[type="file"]')).toBeInTheDocument()
    })

    it('supports file type with accept attribute', () => {
      const { container } = render(<Input type="file" accept="image/*" />)
      const input = container.querySelector('input[type="file"]')
      expect(input).toHaveAttribute('accept', 'image/*')
    })
  })

  describe('Hidden input type', () => {
    it('supports hidden type', () => {
      const { container } = render(<Input type="hidden" value="secret" />)
      expect(
        container.querySelector('input[type="hidden"]')
      ).toBeInTheDocument()
    })
  })

  describe('Input attributes compatibility', () => {
    it('supports min and max for number inputs', () => {
      const { container } = render(<Input type="number" min={0} max={100} />)
      const input = container.querySelector('input[type="number"]')
      expect(input).toHaveAttribute('min', '0')
      expect(input).toHaveAttribute('max', '100')
    })

    it('supports step for number inputs', () => {
      const { container } = render(<Input type="number" step={0.01} />)
      const input = container.querySelector('input[type="number"]')
      expect(input).toHaveAttribute('step', '0.01')
    })

    it('supports pattern for text inputs', () => {
      const { container } = render(
        <Input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
      )
      const input = container.querySelector('input[type="text"]')
      expect(input).toHaveAttribute('pattern', '[0-9]{3}-[0-9]{3}-[0-9]{4}')
    })

    it('supports autocomplete attribute', () => {
      const { container } = render(<Input type="email" autoComplete="email" />)
      const input = container.querySelector('input[type="email"]')
      expect(input).toHaveAttribute('autocomplete', 'email')
    })

    it('supports multiple for file inputs', () => {
      const { container } = render(<Input type="file" multiple />)
      const input = container.querySelector('input[type="file"]')
      expect(input).toHaveAttribute('multiple')
    })
  })
})
