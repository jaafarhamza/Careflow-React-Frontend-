import { useState } from 'react'
import { Search, Menu, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import NotificationBell from '@/components/molecules/NotificationBell'
import UserDropdown, {
  type UserDropdownProps,
} from '@/components/molecules/UserDropdown'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { Input } from '@/components/ui/input'

export interface UnifiedHeaderProps {
  /** Callback to toggle the sidebar on mobile */
  onMenuClick: () => void

  /** Logo configuration */
  logo?: {
    url?: string
    name?: string
  }

  /** User information for dropdown */
  user?: UserDropdownProps['user']

  /** Search configuration */
  search?: {
    enabled: boolean
    placeholder?: string
    onSearch?: (query: string) => void
  }

  /** Show breadcrumb navigation */
  showBreadcrumb?: boolean

  /** Notification configuration */
  notifications?: {
    enabled: boolean
    useComponent?: boolean // Use NotificationBell component or simple icon
  }

  /** User dropdown callbacks */
  onLogout?: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onHelpClick?: () => void

  /** Additional CSS classes */
  className?: string

  /** Header variant */
  variant?: 'simple' | 'full'
}

export default function UnifiedHeader({
  onMenuClick,
  logo,
  user,
  search,
  showBreadcrumb = false,
  notifications = { enabled: true, useComponent: false },
  onLogout,
  onProfileClick,
  onSettingsClick,
  onHelpClick,
  className,
  variant = 'simple',
}: UnifiedHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search?.onSearch && searchQuery.trim()) {
      search.onSearch(searchQuery)
    }
  }

  const showLogo = variant === 'full' && logo
  const showSearch = variant === 'full' && search?.enabled

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center gap-4 border-b bg-background px-4 md:px-6',
        variant === 'simple' ? 'h-14' : 'h-16',
        className
      )}
    >
      {/* Mobile menu button */}
      <button
        className="md:hidden rounded-md p-2 hover:bg-muted transition-colors"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Logo and App Name */}
      {showLogo && (
        <div className="flex items-center gap-2 md:gap-3">
          {logo.url ? (
            <img
              src={logo.url}
              alt={logo.name || 'Logo'}
              className="h-8 w-8 rounded-md"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
              {logo.name?.charAt(0) || 'C'}
            </div>
          )}
          {logo.name && (
            <span className="hidden md:inline-block font-semibold text-lg">
              {logo.name}
            </span>
          )}
        </div>
      )}

      {/* Breadcrumb navigation */}
      {showBreadcrumb && !showSearch && (
        <div className="flex-1 hidden md:block">
          <Breadcrumb />
        </div>
      )}

      {/* Global Search */}
      {showSearch && (
        <form
          onSubmit={handleSearch}
          className={cn(
            'flex-1 max-w-md transition-all',
            isSearchFocused && 'max-w-2xl'
          )}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={search.placeholder || 'Search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="pl-9 pr-4"
            />
          </div>
        </form>
      )}

      {/* Spacer if no breadcrumb or search */}
      {!showBreadcrumb && !showSearch && <div className="flex-1" />}

      {/* Right side actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        {notifications.enabled && (
          <>
            {notifications.useComponent ? (
              <NotificationBell />
            ) : (
              <button
                className="rounded-full p-2 hover:bg-muted transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
            )}
          </>
        )}

        {/* User Dropdown */}
        <UserDropdown
          user={user}
          onLogout={onLogout}
          onProfileClick={onProfileClick}
          onSettingsClick={onSettingsClick}
          onHelpClick={onHelpClick}
          showUserInfo={variant === 'full'}
          showName={variant === 'full'}
          showHelp={variant === 'full'}
        />
      </div>
    </header>
  )
}
