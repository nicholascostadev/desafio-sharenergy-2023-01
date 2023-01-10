import { createContext, ReactNode, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { api } from '../libs/axios'

type User = {
  username: string | undefined
}

type TUserContext = {
  username: User['username']
  signOut: () => void
  isLoading: boolean
  handleSaveToken: (token: string, rememberMe: boolean) => void
}

export const userContext = createContext({} as TUserContext)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<undefined | string>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['sharenergy-session'])
  const sessionCookie = cookies['sharenergy-session']

  useEffect(() => {
    if (username) {
      setIsLoading(false)
      return
    }
    if (!sessionCookie) {
      setIsLoading(false)
      return
    }

    const getSessionToken = async () => {
      setIsLoading(true)
      if (!sessionCookie) {
        setIsLoading(false)
        return
      }
      await api
        .post('/auth/validate', { jwtToken: sessionCookie })
        .then((res) => res.data)
        .then((res) => {
          setUsername(res.data.username)
        })
        .finally(() => setIsLoading(false))
    }

    getSessionToken()
  }, [sessionCookie, username])

  const signOut = () => {
    removeCookie('sharenergy-session')
  }

  const handleSaveToken = (token: string, rememberMe: boolean) => {
    setCookie('sharenergy-session', token, {
      path: '/',
      expires: rememberMe
        ? new Date(Date.now() + 24 * 60 * 60 * 1000)
        : undefined,
    })
  }

  const sessionInfo = {
    username,
    isLoading,
    handleSaveToken,
    signOut,
  }

  return (
    <userContext.Provider value={sessionInfo}>{children}</userContext.Provider>
  )
}
