import { User, Settings, LogOut, HelpCircle } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

export interface UserDropdownProps {
  user?: {
    name: string
    email: string
    avatar?: string
    role?: string
  }
  onLogout?: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onHelpClick?: () => void
  showUserInfo?: boolean
  showName?: boolean
  showHelp?: boolean
}

export default function UserDropdown({
  user,
  onLogout,
  onProfileClick,
  onSettingsClick,
  onHelpClick,
  showUserInfo = true,
  showName = true,
  showHelp = true,
}: UserDropdownProps) {
  const defaultUser = {
    name: user?.name || 'Guest User',
    email: user?.email || 'guest@example.com',
    avatar: user?.avatar,
    role: user?.role || 'User',
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick()
    }
  }

  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick()
    }
  }

  const handleHelpClick = () => {
    if (onHelpClick) {
      onHelpClick()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="User menu"
        >
          <Avatar className="h-8 w-8">
            {defaultUser.avatar && (
              <AvatarImage src={defaultUser.avatar} alt={defaultUser.name} />
            )}
            <AvatarFallback>{getInitials(defaultUser.name)}</AvatarFallback>
          </Avatar>
          {showName && (
            <span className="hidden md:inline-block text-sm font-medium">
              {defaultUser.name}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {showUserInfo && (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {defaultUser.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {defaultUser.email}
                </p>
                {defaultUser.role && (
                  <p className="text-xs leading-none text-muted-foreground">
                    Role: {defaultUser.role}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleProfileClick}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettingsClick}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        {showHelp && (
          <DropdownMenuItem onClick={handleHelpClick}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
