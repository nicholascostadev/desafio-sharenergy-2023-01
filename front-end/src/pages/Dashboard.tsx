import { CaretLeft, CaretRight, SpinnerGap } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { FilterOpts } from '../@types/filter'
import { User } from '../@types/user'
import { Container } from '../components/Container'
import { Navbar } from '../components/Navbar'
import { Search } from '../components/Search'
import { Table } from '../components/Table'
import { useSession, useUsers } from '../hooks'

export const Dashboard = () => {
  const navigate = useNavigate()
  const { username, isLoading: isSessionLoading } = useSession()
  const [search, setSearch] = useState('')
  // debounced value of search(after 500ms set to the current value of the state)
  const [searchValue] = useDebounce(search, 500)
  const [selectedFilter, setSelectedFilter] = useState<FilterOpts>('name')
  const [page, setPage] = useState(1)
  // seed comes from the first request, so needs to be set after the response
  const [seed, setSeed] = useState('')

  const { data, isFetching } = useUsers({ page, setSeed, seed })

  const filteredUsers: User[] = data?.filter((user: User) => {
    switch (selectedFilter.toLowerCase()) {
      case 'email':
        return user.email.toLowerCase().includes(searchValue)
      case 'username':
        return user.login.username.toLowerCase().includes(searchValue)
      default:
        return (
          user.name.first.toLowerCase().includes(searchValue) ||
          user.name.last.toLowerCase().includes(searchValue)
        )
    }
  })

  const handleGoToPrevPage = () => {
    if (page - 1 >= 1) setPage((page) => page - 1)
  }

  const handleGoToNextPage = () => {
    setPage((page) => page + 1)
  }

  const changeSearch = (newSearch: string) => {
    setSearch(newSearch.toLowerCase())
  }

  const changeFilter = (newFilter: FilterOpts) => {
    setSelectedFilter(newFilter)
  }

  useEffect(() => {
    if (!username && !isSessionLoading) navigate('/')
  }, [username, isSessionLoading, navigate])

  return (
    <>
      <Navbar />
      <div className="bg-page-gradient">
        <Container className="min-h-[calc(100vh-48px)] mt-[48px] pt-4">
          <h2 className="text-white text-lg mb-2">Dashboard</h2>

          <div>
            <Search
              title="Procurar por:"
              searchByOptions={['Nome', 'Email', 'Username']}
              filter={selectedFilter}
              changeSearch={changeSearch}
              changeFilter={changeFilter}
            />
            {isFetching && (
              <div className="w-full flex justify-center items-center mt-4">
                <SpinnerGap size={24} className="animate-spin text-white" />
              </div>
            )}

            {filteredUsers && (
              <div className="border border-white/5 rounded-md w-full shadow-lg bg-glass-gradient">
                <Table
                  data={filteredUsers}
                  titles={[
                    'Foto de perfil',
                    'Username',
                    'Nome',
                    'Email',
                    'Idade',
                  ]}
                />
                <div className="flex justify-end gap-2 p-2">
                  <button
                    aria-label="Go back one page"
                    className="text-gray-300 hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                    onClick={handleGoToPrevPage}
                    disabled={page <= 1}
                  >
                    <CaretLeft size={20} />
                  </button>
                  <button
                    aria-label="Go forwards one page"
                    className="text-gray-300 hover:text-white"
                    onClick={handleGoToNextPage}
                  >
                    <CaretRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}
