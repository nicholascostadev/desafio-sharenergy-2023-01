import classNames from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'
import { Container } from './Container'

const links = [
  {
    to: '/dashboard',
    text: 'Dashboard',
  },
  {
    to: '/dashboard/cat ',
    text: 'Cat API',
  },
  {
    to: '/dashboard/randomdog',
    text: 'Random dog',
  },
]

export const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 z-10 w-full border-b border-white/5 backdrop-blur-[12px]">
      <Container className="h-12 flex justify-between items-center text-gray-200">
        <h1 className="text-lg">Sharenergy</h1>

        <ul className="flex gap-2 text-sm">
          {links.map((link) => (
            <li key={link.to}>
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
      </Container>
    </nav>
  )
}
