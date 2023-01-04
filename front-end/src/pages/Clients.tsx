import { Article, PencilLine, Plus, Spinner, Trash } from 'phosphor-react'
import { useState, useEffect } from 'react'
import { Container } from '../components/Container'
import { RegisterClientModal } from '../components/RegisterClientModal'
import { Navbar } from '../components/Navbar'
import { useQuery } from '@tanstack/react-query'
import { api } from '../libs/axios'
import { useSession } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { Client } from '../@types/client'
import classNames from 'classnames'
import { ClientModalFormData } from '../validations/forms'
import { Pagination } from '../components/Pagination'

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
  const [perPage, setPerPage] = useState(1)

  const handleGoToPrevPage = () => {
    if (page - 1 >= 1) setPage((page) => page - 1)
  }

  const handleGoToNextPage = () => {
    setPage((page) => page + 1)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!username && !isLoading) navigate('/')
  }, [username, isLoading, navigate])

  const { data: response, isFetching } = useQuery<{
    data: {
      clients: Client[]
      totalPages: number
    }
  }>({
    queryKey: ['clients', page],
    queryFn: async () =>
      api
        .get(`/clients?perPage=${perPage}&page=${page}`)
        .then((res) => res.data),
    staleTime: 1000 * 60 * 15, // 15 minutes
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

          <div
            className={classNames(
              'flex justify-end items-center',
              isFetching && 'justify-between',
            )}
          >
            {isFetching && (
              <div className="flex justify-center items-center">
                <Spinner size={24} className="animate-spin text-white" />
              </div>
            )}
            <button
              className="text-white flex justify-center items-center gap-2 p-2 rounded-md border border-white/5 shadow-md transition-colors bg-slate-900 hover:bg-white/5"
              onClick={openModal}
            >
              <span className="sr-only">Register new client</span>
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
                {response?.data.clients.map((user) => (
                  <tr
                    key={user.cpf}
                    className="hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <td className="p-2 text-center min-w-[155px]">
                      <button className="p-4 transition-colors hover:text-blue-400">
                        <span className="sr-only">Read more</span>
                        <Article size={24} />
                      </button>
                      <button className="p-4 transition-colors hover:text-red-400">
                        <span className="sr-only">Delete client</span>
                        <Trash size={24} />
                      </button>
                      <button
                        className="p-4 transition-colors hover:text-indigo-400"
                        onClick={() => editCurrentClient(user)}
                      >
                        <span className="sr-only">Edit client</span>
                        <PencilLine size={24} />
                      </button>
                    </td>
                    <td className="p-2">{user.cpf}</td>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.telephone}</td>
                    <td className="p-2">{user.address.zipCode}</td>
                    <td className="p-2">{fullAddress(user)}</td>
                    <td className="p-2">{user.address.additionalInfo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={page}
              perPage={perPage}
              onNextPage={handleGoToNextPage}
              onPrevPage={handleGoToPrevPage}
              totalPages={response?.data.totalPages}
            />
          </div>
        </Container>
      </div>
    </>
  )
}
