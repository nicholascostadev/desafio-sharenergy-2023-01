import classNames from 'classnames'
import { List, X } from 'phosphor-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Container } from './Container'

const links = [
  {
    to: '/dashboard',
    text: 'Dashboard',
  },
  {
    to: '/dashboard/cat',
    text: 'Cat API',
  },
  {
    to: '/dashboard/randomdog',
    text: 'Random dog',
  },
]

export const Navbar = () => {
  const location = useLocation()
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 z-10 w-full border-b border-white/5 backdrop-blur-[12px]">
      <Container className="h-16 flex justify-between items-center text-gray-200">
        <h1 className="text-3xl">Sharenergy</h1>

        <button
          onClick={() => setIsNavbarOpen((prev) => !prev)}
          className="relative sm:hidden"
        >
          <List size={24} />
        </button>

        <div
          className={classNames(
            'absolute transition-all top-0 -right-[100vw] bg-slate-900 h-screen w-screen',
            'sm:right-0 sm:relative sm:bg-transparent sm:h-auto sm:w-auto sm:flex sm:items-center sm:justify-center',
            isNavbarOpen && 'right-[0]',
          )}
        >
          <button
            className="absolute top-5 right-8 sm:hidden"
            onClick={() => setIsNavbarOpen(false)}
          >
            <X size={24} />
          </button>

          <ul
            className={classNames(
              'flex items-center gap-4 text-sm flex-col mt-12',
              'sm:text-lg sm:flex-row sm:mt-0',
              isNavbarOpen && 'text-xl',
            )}
          >
            {links.map((link) => (
              <li key={link.to} onClick={() => setIsNavbarOpen(false)}>
                <NavLink
                  to={link.to}
                  className={classNames(
                    'text-gray-300 hover:text-gray-400 transition-colors',
                    link.to === location.pathname &&
                      'pointer-events-none cursor-not-allowed text-gray-500',
                  )}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  )
}
