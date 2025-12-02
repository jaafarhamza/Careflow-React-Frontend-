import { useAuth } from '@/hooks/useAuth'
import { useAppSelector } from '@/hooks/redux'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export const Dashboard = () => {
  const { logout } = useAuth()
  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    logout()
    // The useAuth hook handles the redirect to login
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName + ' ' + user?.lastName || 'User'}!
          </p>
        </div>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
