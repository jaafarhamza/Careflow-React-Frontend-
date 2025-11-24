import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NotificationBell from '../NotificationBell'
import type { Notification } from '../NotificationBell'

describe('NotificationBell', () => {
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'New Appointment',
      message: 'You have a new appointment scheduled',
      time: '5 minutes ago',
      read: false,
      type: 'info',
    },
    {
      id: '2',
      title: 'Lab Results Ready',
      message: 'Lab results for Patient #123 are ready',
      time: '1 hour ago',
      read: false,
      type: 'success',
    },
    {
      id: '3',
      title: 'System Update',
      message: 'System will be updated tonight',
      time: '2 hours ago',
      read: true,
      type: 'warning',
    },
  ]

  it('renders notification bell button', () => {
    render(<NotificationBell />)
    expect(screen.getByLabelText(/notifications/i)).toBeInTheDocument()
  })

  it('shows unread count badge', () => {
    render(<NotificationBell notifications={mockNotifications} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('shows 9+ for more than 9 unread notifications', () => {
    const manyNotifications = Array.from({ length: 15 }, (_, i) => ({
      id: `${i}`,
      title: `Notification ${i}`,
      message: 'Test message',
      time: 'now',
      read: false,
    }))
    render(<NotificationBell notifications={manyNotifications} />)
    expect(screen.getByText('9+')).toBeInTheDocument()
  })

  it('renders with no badge when all notifications are read', () => {
    const readNotifications = mockNotifications.map((n) => ({
      ...n,
      read: true,
    }))
    render(<NotificationBell notifications={readNotifications} />)
    expect(screen.queryByText('2')).not.toBeInTheDocument()
  })

  it('renders with empty notifications array', () => {
    render(<NotificationBell notifications={[]} />)
    expect(screen.getByLabelText(/notifications/i)).toBeInTheDocument()
  })
})
