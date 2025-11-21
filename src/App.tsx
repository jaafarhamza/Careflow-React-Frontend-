import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useSentryUser } from './hooks/useSentryUser'
import './App.css'

function App() {
  // Sync user context with Sentry
  useSentryUser()

  return <RouterProvider router={router} />
}

export default App
