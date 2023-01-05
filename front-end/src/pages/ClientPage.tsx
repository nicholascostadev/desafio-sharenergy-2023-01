import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSession } from '../hooks'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GetClientResponse, Address, Client } from '../@types/client'
import { api } from '../libs/axios'
import { Navbar } from '../components/Navbar'
import { Container } from '../components/Container'
import { CircleNotch } from 'phosphor-react'
import { RegisterClientModal } from '../components/RegisterClientModal'
import { ClientModalFormData } from '../validations/forms'
import { ClientPageActionButtons } from '../components/pages/ClientPage/ActionButtons'
import { TableRow } from '../components/pages/ClientPage/TableRow'
import { isDateKey } from '../utils/isDateKey'

export const ClientPage = () => {
  const { clientId } = useParams()
  const {
    data: response,
    isError,
    isInitialLoading,
  } = useQuery<GetClientResponse>({
    queryKey: ['client', clientId],
    queryFn: async () =>
      api.get(`/clients/${clientId}`).then((res) => res.data),
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
  })
  const [deleted, setDeleted] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: deleteClient } = useMutation({
    mutationFn: async (clientId: string) => {
      await api.delete(`/clients/${clientId}`).then((res) => res.data)
    },
    onSuccess: () => {
      setDeleted(true)
      queryClient.invalidateQueries(['client'])
    },
  })
  const [currentClient, setCurrentClient] = useState<
    ClientModalFormData | undefined
  >(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const client = response?.data
  const { username, isLoading } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!username && !isLoading) navigate('/')
  }, [username, isLoading, navigate])

  const closeModal = () => {
    setCurrentClient(undefined)
    setIsModalOpen(false)
  }

  const handleEditCurrentClient = (client: Client) => {
    setCurrentClient(client)
    setIsModalOpen(true)
  }

  const handleDeleteClient = (clientId: string) => {
    deleteClient(clientId)
  }

  const hasErrored = isError || (client == null && !isInitialLoading)

  return (
    <>
      <RegisterClientModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        initialData={currentClient as Client}
      />
      <Navbar />
      <div className="bg-page-gradient">
        <Container className="mt-16 min-h-[calc(100vh-64px)] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full">
            {client == null && (
              <div className="text-gray-200">
                {deleted && (
                  <p className="text-green-400 text-lg">
                    Cliente deletado com sucesso,{' '}
                    <Link
                      to="/dashboard/clients"
                      className="text-blue-400 hover:text-blue-600 underline"
                    >
                      Voltar
                    </Link>
                  </p>
                )}
                {hasErrored && !deleted && (
                  <p className="text-red-400 text-lg">
                    Cliente não encontrado,{' '}
                    <Link
                      to="/dashboard/clients"
                      className="text-blue-400 hover:text-blue-600 underline"
                    >
                      Voltar
                    </Link>
                  </p>
                )}

                {isInitialLoading && !deleted && (
                  <div className="flex justify-center items-center">
                    <CircleNotch
                      size={40}
                      className="animate-spin text-white"
                    />
                  </div>
                )}
              </div>
            )}
            {client && (
              <>
                <ClientPageActionButtons
                  client={client}
                  onDelete={handleDeleteClient}
                  onEdit={handleEditCurrentClient}
                />
                <div className="border border-white/10 rounded-md shadow-md w-full p-2">
                  <table className="w-full text-gray-200 text-lg table [&_td]:border-l [&_td]:border-l-white/10 [&_td]:pl-2 [&_td]:p-2 [&_th]:p-2 border-collapse">
                    <tbody>
                      {Object.entries(client).map(([key, value]) => {
                        if (key === 'address') {
                          return Object.entries(value as Address).map(
                            ([key, value]) => {
                              // since I don't want the `createdAt` and `updatedAt` from
                              // the Address Table, I'm checking if the key is a date
                              if (isDateKey(key)) return null
                              return (
                                <TableRow key={key} title={key} value={value} />
                              )
                            },
                          )
                        }

                        return (
                          <TableRow
                            key={key}
                            title={key}
                            value={value as string}
                          />
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}
