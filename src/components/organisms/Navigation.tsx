import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  navigationConfig,
  filterNavigationByRole,
  type NavItem,
} from '@/config/navigation.config'

interface NavigationProps {
  role: string
  onNavigate?: () => void
}

interface NavItemComponentProps {
  item: NavItem
  depth?: number
  onNavigate?: () => void
}

function NavItemComponent({
  item,
  depth = 0,
  onNavigate,
}: NavItemComponentProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()
  const hasChildren = item.children && item.children.length > 0

  // Check if current route or any child route is active
  const isActive =
    location.pathname === item.to ||
    (hasChildren &&
      item.children?.some((child) => location.pathname.startsWith(child.to)))

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    } else if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={handleClick}
          className={cn(
            'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
            depth > 0 && 'pl-8',
            isActive && 'bg-muted font-semibold'
          )}
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <span>{item.label}</span>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 transition-transform" />
          ) : (
            <ChevronRight className="h-4 w-4 transition-transform" />
          )}
        </button>
      ) : (
        <NavLink
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
              depth > 0 && 'pl-8',
              isActive && 'bg-muted font-semibold'
            )
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      )}

      {/* Nested children with animation */}
      {hasChildren && (
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="ml-2 mt-1 space-y-1 border-l-2 border-muted pl-2">
            {item.children?.map((child) => (
              <NavItemComponent
                key={child.to}
                item={child}
                depth={depth + 1}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navigation({ role, onNavigate }: NavigationProps) {
  const filteredItems = filterNavigationByRole(navigationConfig, role)

  return (
    <nav className="flex-1 space-y-1" aria-label="Main navigation">
      {filteredItems.map((item) => (
        <NavItemComponent key={item.to} item={item} onNavigate={onNavigate} />
      ))}
    </nav>
  )
}
