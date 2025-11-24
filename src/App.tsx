import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useSentryUser } from './hooks/useSentryUser'
import './App.css'

import { ToastProvider } from '@/context/ToastProvider'
import { ToastContainer } from '@/components/molecules/ToastContainer'

function App() {
  // Sync user context with Sentry
  useSentryUser()

  return (
    <ToastProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ToastProvider>
  )
}

export default App
