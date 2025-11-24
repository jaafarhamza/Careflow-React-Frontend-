import { cn } from '@/lib/utils'
import Navigation from './Navigation'

type SidebarProps = {
  role: string
  open: boolean
  onClose: () => void
}

export default function Sidebar({ role, open, onClose }: SidebarProps) {
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
        <Navigation role={role} onNavigate={onClose} />
      </div>
    </aside>
  )
}
