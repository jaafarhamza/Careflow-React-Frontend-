import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)

  const crumbs = parts.map((part, idx) => {
    const to = '/' + parts.slice(0, idx + 1).join('/')
    // Capitalize the part for display
    const label = part.charAt(0).toUpperCase() + part.slice(1)
    const isLast = idx === parts.length - 1
    return (
      <li
        key={to}
        className={cn('flex items-center', isLast && 'text-muted-foreground')}
      >
        {isLast ? (
          <span>{label}</span>
        ) : (
          <Link to={to} className="hover:underline">
            {label}
          </Link>
        )}
        {!isLast && <span className="mx-2 text-muted-foreground">/</span>}
      </li>
    )
  })

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex text-sm" data-slot="breadcrumb">
        {crumbs}
      </ol>
    </nav>
  )
}
