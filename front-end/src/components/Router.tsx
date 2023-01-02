import { createBrowserRouter } from 'react-router-dom'
import { Cat } from '../pages/Cat'
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
  {
    path: '/dashboard/cat',
    element: <Cat />,
  },
])
