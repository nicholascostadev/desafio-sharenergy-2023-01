import classNames from 'classnames'
import { List, SignOut, X } from 'phosphor-react'
import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Container } from './Container'
import { useSession } from '../hooks/useSession'

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
  {
    to: '/dashboard/clients',
    text: 'Clientes',
  },
]

export const Navbar = () => {
  const location = useLocation()
  const { signOut } = useSession()
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate(0)
  }

  return (
    <nav className="fixed top-0 left-0 z-10 w-full border-b border-white/5 backdrop-blur-[12px]">
      <Container className="h-16 flex justify-between items-center text-gray-200">
        <h1 className="text-3xl">Sharenergy</h1>

        <button
          onClick={() => setIsNavbarOpen((prev) => !prev)}
          className="relative md:hidden"
        >
          <List size={24} />
        </button>

        <div
          className={classNames(
            'absolute transition-all top-0 -right-[100vw] bg-slate-900 h-screen w-screen',
            'md:right-0 md:relative md:bg-transparent md:h-auto md:w-auto md:flex md:items-center md:justify-center',
            isNavbarOpen && 'right-[0]',
          )}
        >
          <button
            className="absolute top-5 right-8 md:hidden"
            onClick={() => setIsNavbarOpen(false)}
          >
            <X size={24} />
          </button>

          <ul
            className={classNames(
              'flex items-center gap-4 text-sm flex-col mt-12',
              'md:text-lg md:flex-row md:mt-0',
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
            <li>
              <button
                onClick={handleSignOut}
                className="bg-slate-800 hover:bg-white/5 text-gray-100 hover:text-gray-300 transition-colors border border-white/5 rounded-md py-1 px-4 flex justify-center items-center gap-2"
              >
                Sair
                <SignOut size={24} />
              </button>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  )
}
