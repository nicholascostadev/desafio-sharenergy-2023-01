import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'

type TUseUsersParams = {
  page: number
  setSeed: Dispatch<SetStateAction<string>>
  seed?: string
}

export const useUsers = ({ page, setSeed, seed }: TUseUsersParams) =>
  useQuery({
    queryKey: ['users', page],
    queryFn: () =>
      axios
        .get(
          `https://randomuser.me/api/?page=${page}&results=20&seed=${seed}&inc=email,dob,login,name,picture`,
        )
        .then((res) => {
          setSeed(res.data.info.seed)
          return res.data.results
        }),
    staleTime: 1000 * 60 * 15,
  })
