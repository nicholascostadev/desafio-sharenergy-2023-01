import { SyntheticEvent, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Container } from '../components/Container'
import { Input } from '../components/Input'
import { Navbar } from '../components/Navbar'

export const Cat = () => {
  const [status, setStatus] = useState<string | null>(null)
  const [statusValue] = useDebounce(status, 800)

  const addImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.target.onerror = null
    event.currentTarget.src = 'https://github.com/nicholascostadev.png'
  }

  return (
    <>
      <Navbar />
      <div className="mt-16">
        <Container>
          <div>
            <Input
              label="CAT API"
              placeholder="Procure por qualquer código HTTP"
              type="number"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center">
            {status && (
              <img
                src={`https://http.cat/${statusValue}`}
                alt="Cat image corresponding to status code"
                className="rounded-md my-4 w-96"
                onError={addImageFallback}
              />
            )}
          </div>
        </Container>
      </div>
    </>
  )
}
