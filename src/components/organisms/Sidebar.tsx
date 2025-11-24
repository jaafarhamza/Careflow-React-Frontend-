import React from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  to: string
  roles?: string[]
  icon?: React.ReactNode
}

const NAV_ITEMS: NavItem[] = []

type SidebarProps = {
  role: string
  open: boolean
  onClose: () => void
}

export default function Sidebar({ role, open, onClose }: SidebarProps) {
  const filteredItems = NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(role)
  )

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 w-64 transform bg-card shadow-lg transition-transform duration-300 ease-in-out',
        open ? 'translate-x-0' : '-translate-x-full',
        'md:relative md:translate-x-0 md:shadow-none'
      )}
    >
      <div className="flex h-full flex-col p-4">
        <button
          className="mb-4 self-end md:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
        <nav className="flex-1 space-y-2">
          {filteredItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted',
                  isActive ? 'bg-muted font-semibold' : ''
                )
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
