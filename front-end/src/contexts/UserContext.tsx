import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type User = {
  username: string | undefined
}

type TUserContext = {
  username: User['username']
  isLoading: boolean
  handleSetUsername: (incomingUsername: string, persist?: boolean) => void
}

export const userContext = createContext({} as TUserContext)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<undefined | string>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userSession = localStorage.getItem('sharenergy-session')

    if (userSession) setUsername((JSON.parse(userSession) as User).username)

    setIsLoading(false)
  }, [])

  const handleSetUsername = (incomingUsername: string, persist?: boolean) => {
    setUsername(incomingUsername)

    if (persist) {
      localStorage.setItem(
        'sharenergy-session',
        JSON.stringify({ username: incomingUsername }),
      )
    }
  }

  const sessionInfo = {
    username,
    isLoading,
    handleSetUsername,
  }

  return (
    <userContext.Provider value={sessionInfo}>{children}</userContext.Provider>
  )
}
