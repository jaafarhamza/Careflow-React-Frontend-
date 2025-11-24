import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/organisms/Sidebar'
import Header from '@/components/organisms/Header'

interface MainLayoutProps {
  /** Current user role, used to filter sidebar navigation */
  role: string
}

/**
 * Main application layout that composes Header, Sidebar, main content and Footer.
 * It handles the responsive toggle of the sidebar on mobile devices.
 */
export default function MainLayout({ role }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar – hidden on small screens, overlay when open */}
      <Sidebar
        role={role}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Render nested routes */}
          <Outlet />
        </main>
        <footer className="border-t p-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Careflow. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
