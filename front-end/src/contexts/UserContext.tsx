import { createContext, ReactNode, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

type User = {
  username: string | undefined
}

type TUserContext = {
  username: User['username']
  isLoading: boolean
}

export const userContext = createContext({} as TUserContext)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<undefined | string>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [cookies] = useCookies(['sharenergy-session'])
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
      await axios
        .post('http://localhost:4444/auth/validate', {
          jwtToken: sessionCookie,
        })
        .then((res) => res.data)
        .then((res) => {
          setUsername(res.data.username)
        })
        .finally(() => setIsLoading(false))
    }

    getSessionToken()
  }, [sessionCookie, username])

  const sessionInfo = {
    username,
    isLoading,
  }

  return (
    <userContext.Provider value={sessionInfo}>{children}</userContext.Provider>
  )
}
