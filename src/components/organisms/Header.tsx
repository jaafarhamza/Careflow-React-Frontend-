import { Bell, Menu } from 'lucide-react'
import UserDropdown from '@/components/molecules/UserDropdown'
import Breadcrumb from '@/components/molecules/Breadcrumb'

interface HeaderProps {
  /** Callback to toggle the sidebar on mobile */
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4 md:px-6">
      {/* Mobile menu button */}
      <button
        className="md:hidden rounded-md p-2 hover:bg-muted"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Breadcrumb navigation – hidden on very small screens */}
      <div className="flex-1 hidden md:block">
        <Breadcrumb />
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        <button
          className="rounded-full p-2 hover:bg-muted"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <UserDropdown showUserInfo={false} showHelp={false} />
      </div>
    </header>
  )
}
