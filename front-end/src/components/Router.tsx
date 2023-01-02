import { createBrowserRouter } from 'react-router-dom'
import { Cat } from '../pages/Cat'
import { Clients } from '../pages/Clients'
import { Dashboard } from '../pages/Dashboard'
import { LoginPage } from '../pages/Login'
import { RandomDog } from '../pages/RandomDog'

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
  {
    path: '/dashboard/randomdog',
    element: <RandomDog />,
  },
  {
    path: '/dashboard/clients',
    element: <Clients />,
  },
])
