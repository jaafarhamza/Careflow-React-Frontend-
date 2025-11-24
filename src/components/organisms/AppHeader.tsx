import { useState } from 'react'
import { Search, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import NotificationBell from '@/components/molecules/NotificationBell'
import UserDropdown from '@/components/molecules/UserDropdown'
import { Input } from '@/components/ui/input'

interface AppHeaderProps {
  onMenuClick: () => void
  logoUrl?: string
  appName?: string
  user?: {
    name: string
    email: string
    avatar?: string
    role?: string
  }
  onSearch?: (query: string) => void
  onLogout?: () => void
}

export default function AppHeader({
  onMenuClick,
  logoUrl,
  appName = 'Careflow',
  user,
  onSearch,
  onLogout,
}: AppHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {/* Mobile menu button */}
      <button
        className="md:hidden rounded-md p-2 hover:bg-muted transition-colors"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Logo and App Name */}
      <div className="flex items-center gap-2 md:gap-3">
        {logoUrl ? (
          <img src={logoUrl} alt={appName} className="h-8 w-8 rounded-md" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
            {appName.charAt(0)}
          </div>
        )}
        <span className="hidden md:inline-block font-semibold text-lg">
          {appName}
        </span>
      </div>

      {/* Global Search */}
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
            placeholder="Search patients, records, appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-9 pr-4"
          />
        </div>
      </form>

      {/* Right side actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <NotificationBell />
        <UserDropdown user={user} onLogout={onLogout} />
      </div>
    </header>
  )
}
