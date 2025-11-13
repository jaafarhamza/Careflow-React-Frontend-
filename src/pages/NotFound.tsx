import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={ROUTES.HOME}>Go to Home</Link>
    </div>
  )
}