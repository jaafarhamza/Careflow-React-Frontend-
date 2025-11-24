import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../Card'

describe('Card', () => {
  describe('Rendering', () => {
    it('renders card with all sections', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Test Content</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      )

      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
    })

    it('renders card without header', () => {
      render(
        <Card>
          <CardContent>
            <p>Content only</p>
          </CardContent>
        </Card>
      )

      expect(screen.getByText('Content only')).toBeInTheDocument()
    })

    it('renders card without footer', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content</p>
          </CardContent>
        </Card>
      )

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('applies default variant', () => {
      const { container } = render(<Card>Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('rounded-lg')
      expect(card).toHaveClass('border')
    })

    it('applies outlined variant', () => {
      const { container } = render(<Card variant="outlined">Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('border-2')
    })
  })

  describe('Shadow Variants', () => {
    it('applies no shadow', () => {
      const { container } = render(<Card shadow="none">Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('shadow-none')
    })

    it('applies small shadow', () => {
      const { container } = render(<Card shadow="sm">Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('shadow-sm')
    })

    it('applies medium shadow', () => {
      const { container } = render(<Card shadow="md">Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('shadow-md')
    })

    it('applies large shadow', () => {
      const { container } = render(<Card shadow="lg">Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('shadow-lg')
    })

    it('applies extra large shadow', () => {
      const { container } = render(<Card shadow="xl">Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('shadow-xl')
    })
  })

  describe('Hover Effects', () => {
    it('applies lift hover effect', () => {
      const { container } = render(<Card hover="lift">Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('hover:-translate-y-1')
      expect(card).toHaveClass('hover:shadow-lg')
    })

    it('applies glow hover effect', () => {
      const { container } = render(<Card hover="glow">Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('hover:shadow-xl')
      expect(card).toHaveClass('hover:border-primary/50')
    })

    it('applies scale hover effect', () => {
      const { container } = render(<Card hover="scale">Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('hover:scale-[1.02]')
    })

    it('applies no hover effect by default', () => {
      const { container } = render(<Card>Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).not.toHaveClass('hover:-translate-y-1')
      expect(card).not.toHaveClass('hover:scale-[1.02]')
    })
  })

  describe('Loading State', () => {
    it('renders skeleton when loading', () => {
      const { container } = render(<Card loading>Content</Card>)
      const skeletons = container.querySelectorAll('.animate-pulse')
      expect(skeletons.length).toBeGreaterThan(0)
    })

    it('does not render children when loading', () => {
      render(
        <Card loading>
          <CardContent>
            <p>This should not appear</p>
          </CardContent>
        </Card>
      )
      expect(
        screen.queryByText('This should not appear')
      ).not.toBeInTheDocument()
    })

    it('renders children when not loading', () => {
      render(
        <Card loading={false}>
          <CardContent>
            <p>This should appear</p>
          </CardContent>
        </Card>
      )
      expect(screen.getByText('This should appear')).toBeInTheDocument()
    })
  })
})
