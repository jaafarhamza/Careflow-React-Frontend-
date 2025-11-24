import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserDropdown from '../UserDropdown'

describe('UserDropdown', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Doctor',
    avatar: '/avatar.jpg',
  }

  it('renders user name on desktop', () => {
    render(<UserDropdown user={mockUser} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders fallback initials when no avatar', () => {
    const userWithoutAvatar = { ...mockUser, avatar: undefined }
    render(<UserDropdown user={userWithoutAvatar} />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders default user when no user provided', () => {
    render(<UserDropdown />)
    expect(screen.getByText('Guest User')).toBeInTheDocument()
  })

  it('renders user menu button', () => {
    render(<UserDropdown user={mockUser} />)
    expect(screen.getByLabelText('User menu')).toBeInTheDocument()
  })

  it('generates correct initials for multi-word names', () => {
    const user = { ...mockUser, name: 'John Michael Doe', avatar: undefined }
    render(<UserDropdown user={user} />)
    expect(screen.getByText('JM')).toBeInTheDocument()
  })

  it('generates single initial for single-word names', () => {
    const user = { ...mockUser, name: 'John', avatar: undefined }
    render(<UserDropdown user={user} />)
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('renders avatar component when avatar URL is provided', () => {
    const { container } = render(<UserDropdown user={mockUser} />)
    const avatar = container.querySelector('[data-slot="avatar"]')
    expect(avatar).toBeInTheDocument()
  })
})
