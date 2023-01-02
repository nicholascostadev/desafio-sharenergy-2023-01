import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Container } from '../components/Container'
import { Input } from '../components/Input'
import { Navbar } from '../components/Navbar'

export const Cat = () => {
  const [status, setStatus] = useState<string | null>(null)
  const [statusValue] = useDebounce(status, 800)

  return (
    <>
      <Navbar />
      <div className="bg-page-gradient">
        <Container className="min-h-[calc(100vh-48px)] mt-16 pt-4">
          <div>
            <h2 className="text-white text-2xl">Cat API</h2>
            <Input
              placeholder="Procure por qualquer código HTTP"
              type="number"
              onChange={(e) => setStatus(e.target.value)}
              className="text-base placeholder:text-base h-full"
            />
          </div>
          <div className="flex justify-center items-center">
            {statusValue && (
              <img
                src={`https://http.cat/${statusValue}`}
                alt="Cat image corresponding to status code"
                className="rounded-md my-4 w-96"
              />
            )}
          </div>
        </Container>
      </div>
    </>
  )
}
