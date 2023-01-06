import { Article, PencilLine, Plus, Spinner, Trash } from 'phosphor-react'
import { useState, useEffect } from 'react'
import { Container } from '../components/Container'
import { RegisterClientModal } from '../components/RegisterClientModal'
import { Navbar } from '../components/Navbar'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../libs/axios'
import { useSession } from '../hooks'
import { Link, useNavigate } from 'react-router-dom'
import { Client } from '../@types/client'
import { ClientModalFormData } from '../validations/forms'
import { Pagination } from '../components/Pagination'
import { Search } from '../components/Search'
import { useDebounce } from 'use-debounce'

const titles = [
  'CPF',
  'Nome',
  'E-mail',
  'Telefone',
  'CEP',
  'Endereço (Resumido)',
  'Complemento',
]

export const Clients = () => {
  const { username, isLoading } = useSession()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentClient, setCurrentClient] = useState<
    ClientModalFormData | undefined
  >(undefined)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [selectedFilter, setSelectedFilter] = useState('name')
  const [search, setSearch] = useState('')
  // debounced value of search(after 500ms set to the current value of the state)
  const [searchValue] = useDebounce(search, 500)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleGoToPrevPage = () => {
    if (page - 1 >= 1) setPage((page) => page - 1)
  }

  const handleGoToNextPage = () => {
    setPage((page) => page + 1)
  }

  useEffect(() => {
    if (!username && !isLoading) navigate('/')
  }, [username, isLoading, navigate])

  const { data: response, isFetching } = useQuery<{
    data: {
      clients: Client[]
      totalPages: number
    }
  }>({
    queryKey: ['clients', page, perPage, selectedFilter, searchValue],
    queryFn: async () =>
      api
        .get(
          `/clients?perPage=${perPage}&page=${page}&filter=${selectedFilter}&query=${searchValue}`,
        )
        .then((res) => res.data),
    staleTime: 1000 * 60 * 15, // 15 minutes
  })

  const { mutate: deleteClient } = useMutation({
    mutationFn: async (clientId: string) => {
      await api.delete(`/clients/${clientId}`).then((res) => res.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['clients'])
    },
  })

  const closeModal = () => {
    setCurrentClient(undefined)
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const editCurrentClient = (client: Client) => {
    setCurrentClient(client)
    setIsModalOpen(true)
  }

  const handleDeleteClient = (clientId: string) => {
    deleteClient(clientId)
  }

  const handleChangeSearch = (newSearch: string) => {
    setSearch(newSearch.toLowerCase())
  }

  const handleChangeFilter = (newFilter: string) => {
    setSelectedFilter(newFilter)
  }

  const handleResetPage = () => {
    setPage(1)
  }

  const handleChangePerPage = (newPerPage: number) => {
    setPerPage(newPerPage)
  }

  const fullAddress = (client: Client) =>
    `${client.address.street}, ${client.address.number}`

  return (
    <>
      <div className="bg-page-gradient">
        <Navbar />
        <RegisterClientModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          initialData={currentClient as Client}
        />

        <Container className="min-h-[calc(100vh-64px)] w-[1600px] mt-16 pt-4">
          <h2 className="text-white text-2xl">Clientes</h2>

          <div className={'flex justify-between items-start mt-6 gap-4'}>
            <Search
              title="Procurar por:"
              searchByOptions={[
                {
                  value: 'Nome',
                  filterInQuery: 'name',
                },
                {
                  value: 'Email',
                  filterInQuery: 'email',
                },
              ]}
              filter={selectedFilter}
              changeFilter={handleChangeFilter}
              changeSearch={handleChangeSearch}
              resetPageOnChange={handleResetPage}
              className="flex-1"
            />
            {isFetching && (
              <div className="flex justify-center items-center">
                <Spinner size={24} className="animate-spin text-white" />
              </div>
            )}
            <button
              className="text-white flex justify-center items-center gap-2 p-2 rounded-md border border-white/5 shadow-md transition-colors bg-slate-900 hover:bg-white/5"
              onClick={openModal}
            >
              <p className="hidden sm:inline">Registrar cliente</p>
              <Plus size={18} />
            </button>
          </div>
          <div className="border border-white/5 rounded-md w-full shadow-lg overflow-x-auto mt-4">
            <table className="table-auto border-collapse w-full text-lg overflow-scroll">
              <thead className="text-gray-50 text-left">
                <tr>
                  <th className="border-b border-slate-400/5 text-center p-2">
                    Actions
                  </th>
                  {titles.map((title) => (
                    <th
                      key={title}
                      className="border-b border-slate-400/5 text-left p-2"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-300 text-base">
                {response?.data.clients.map((client) => (
                  <tr key={client.cpf}>
                    <td className="p-2 flex justify-center items-center min-w-[155px]">
                      <Link
                        to={`/dashboard/clients/${client.id}`}
                        className="p-4 transition-colors hover:text-blue-400"
                      >
                        <span className="sr-only">Read more</span>
                        <Article size={24} />
                      </Link>
                      <button
                        className="p-4 transition-colors hover:text-red-400"
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        <span className="sr-only">Delete client</span>
                        <Trash size={24} />
                      </button>
                      <button
                        className="p-4 transition-colors hover:text-indigo-400"
                        onClick={() => editCurrentClient(client)}
                      >
                        <span className="sr-only">Edit client</span>
                        <PencilLine size={24} />
                      </button>
                    </td>
                    <td className="p-2">{client.cpf}</td>
                    <td className="p-2">{client.name}</td>
                    <td className="p-2">{client.email}</td>
                    <td className="p-2">{client.telephone}</td>
                    <td className="p-2">{client.address.zipCode}</td>
                    <td className="p-2">{fullAddress(client)}</td>
                    <td className="p-2">{client.address.additionalInfo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={page}
              totalPages={response?.data.totalPages}
              perPage={perPage}
              onNextPage={handleGoToNextPage}
              onPrevPage={handleGoToPrevPage}
              onPerPageChange={handleChangePerPage}
            />
          </div>
        </Container>
      </div>
    </>
  )
}
