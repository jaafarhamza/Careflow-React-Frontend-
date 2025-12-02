import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { Button } from './ui/button'

export function RouteErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="mt-4 text-3xl font-bold">{error.status}</h1>
          <p className="mt-2 text-muted-foreground">{error.statusText}</p>
          <Button asChild className="mt-6">
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-3xl font-bold">Oops!</h1>
        <p className="mt-2 text-muted-foreground">Something went wrong</p>
        <Button asChild className="mt-6">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}
