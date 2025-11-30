import { Outlet, Link } from 'react-router-dom'
import { HeartPulse } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="w-full flex flex-col items-center justify-center dark:from-slate-900 dark:to-slate-800 p-4 sm:p-8">

      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center text-center">
          <Link
            to="/"
            className="flex flex-col items-center text-primary hover:opacity-80 transition-opacity"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
              <HeartPulse className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">CareFlow</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Welcome back
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-card text-card-foreground shadow-xl rounded-xl border border-border/50 overflow-hidden">
          <div className="p-6 sm:p-8">
            <Outlet />
          </div>
        </div>

        {/* Footer Links */}
        <footer className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground">
          <div className="flex gap-4">
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/help" className="hover:text-primary transition-colors">
              Help Center
            </Link>
          </div>
          <p>
            &copy; {new Date().getFullYear()} CareFlow. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}
