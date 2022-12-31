import { CaretLeft, CaretRight, SpinnerGap } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../components/Container'
import { Input } from '../components/Input'
import { Navbar } from '../components/Navbar'
import { Table } from '../components/Table'
import { useSession, useUsers } from '../hooks'

export const Dashboard = () => {
  const { username, isLoading: isSessionLoading } = useSession()
  const [page, setPage] = useState(1)
  const [seed, setSeed] = useState('')

  const { data, isFetching } = useUsers({ page, setSeed, seed })

  const handleGoToPrevPage = () => {
    if (page - 1 >= 1) setPage((page) => page - 1)
  }

  const handleGoToNextPage = () => {
    setPage((page) => page + 1)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!username && !isSessionLoading) navigate('/')
  }, [username, isSessionLoading, navigate])

  return (
    <>
      <Navbar />
      <div className="bg-page-gradient">
        <Container className="min-h-[calc(100vh-48px)] mt-[48px] pt-4">
          <h2 className="text-white text-lg">Dashboard</h2>

          <div>
            <Input
              placeholder="Pesquise aqui"
              className="placeholder:text-sm text-sm"
            />

            {isFetching && (
              <div className="w-full flex justify-center items-center mt-4">
                <SpinnerGap size={24} className="animate-spin text-white" />
              </div>
            )}

            {data && (
              <div className="border border-white/5 rounded-md w-full mt-4 shadow-lg bg-glass-gradient">
                <Table
                  data={data}
                  titles={['Profile Image', 'Username', 'Email', 'Age']}
                />
                <div className="flex justify-end gap-2 p-2">
                  <button
                    aria-label="Go back one page"
                    className="text-white"
                    onClick={handleGoToPrevPage}
                  >
                    <CaretLeft size={20} />
                  </button>
                  <button
                    aria-label="Go forwards one page"
                    className="text-white"
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
