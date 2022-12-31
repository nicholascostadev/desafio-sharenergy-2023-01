import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { LoginPage } from '../pages/Login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
])
