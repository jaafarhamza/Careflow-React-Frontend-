import { useState } from 'react'
import { Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/atoms'

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type?: 'info' | 'success' | 'warning' | 'error'
}

interface NotificationBellProps {
  notifications?: Notification[]
  onNotificationClick?: (notification: Notification) => void
  onMarkAllRead?: () => void
}

export default function NotificationBell({
  notifications = [],
  onNotificationClick,
  onMarkAllRead,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const handleNotificationClick = (notification: Notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification)
    }
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative rounded-full p-2 hover:bg-muted transition-colors"
          aria-label={`Notifications${
            unreadCount > 0 ? ` (${unreadCount} unread)` : ''
          }`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && onMarkAllRead && (
            <button
              onClick={onMarkAllRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={cn(
                  'flex flex-col items-start gap-1 px-4 py-3 cursor-pointer',
                  !notification.read && 'bg-muted/50'
                )}
              >
                <div className="flex w-full items-start justify-between gap-2">
                  <p className="font-medium text-sm">{notification.title}</p>
                  {notification.type && (
                    <Badge
                      variant={
                        notification.type === 'error'
                          ? 'destructive'
                          : notification.type === 'success'
                          ? 'success'
                          : notification.type === 'warning'
                          ? 'warning'
                          : 'default'
                      }
                      size="sm"
                    >
                      {notification.type}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {notification.message}
                </p>
                <span className="text-xs text-muted-foreground">
                  {notification.time}
                </span>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
