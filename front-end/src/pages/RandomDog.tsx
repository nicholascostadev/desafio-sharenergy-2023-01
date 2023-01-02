import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import classNames from 'classnames'
import { ArrowsCounterClockwise } from 'phosphor-react'
import { useCallback, useState } from 'react'
import { Container } from '../components/Container'
import { Navbar } from '../components/Navbar'

export const RandomDog = () => {
  const [isVideo, setIsVideo] = useState(false)
  const getImageSrc = useCallback((data: any) => {
    // find the img src, since I don't want to use the HTML from the website as it may be unsafe
    const src =
      'https://random.dog/' +
      String(data)
        .split('\n')
        .find((line) => line.trim().includes('<img'))
        ?.split('src=')[1]
        ?.split('"')[1]

    return src
  }, [])

  const getVideoSrc = useCallback((data: any) => {
    // find the video src, since I don't want to use the HTML from the website as it may be unsafe
    const src =
      'https://random.dog/' +
      String(data)
        .split('\n')
        .find((line) => line.trim().includes('<source'))
        ?.split('src=')[1]
        ?.split('"')[1]

    return src
  }, [])

  const { data, isFetching, refetch } = useQuery<string>({
    queryKey: ['dog'],
    queryFn: () =>
      axios.get('https://random.dog/').then((res) => {
        const imageSrc = getImageSrc(res.data)
        // whenever we don't have a img src in the data received, it means that we have a .mp4 file,
        // so to check it, we split it at the end of the "g" from 'https://random.do"G"' and get the
        // string after slash, if it's "undefined", it's a video
        if (imageSrc.split('g/')[1] === 'undefined') {
          const vidSource = getVideoSrc(res.data)
          setIsVideo(true)
          return vidSource
        } else {
          setIsVideo(false)
          return imageSrc
        }
      }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  })

  const handleRefresh = () => {
    refetch()
  }

  return (
    <>
      <Navbar />
      <div className="bg-page-gradient">
        <Container className="min-h-[calc(100vh-48px)] mt-12 pt-4">
          <label className="flex items-center justify-center text-white cursor-pointer">
            Carregar uma foto ou vídeo de cachorro aleatório
            <button
              className={classNames(
                'p-2',
                isFetching && 'animate-spin-reverse',
              )}
              onClick={handleRefresh}
            >
              <ArrowsCounterClockwise size={20} />
            </button>
          </label>
          <p className="text-red-300 text-center text-sm">
            Aviso: Você pode acabar ficando maravilhado
          </p>
          <div className="flex justify-center items-center mt-10">
            {isVideo && (
              <video id="dog-img" autoPlay loop muted className="max-h-96">
                <source src={data} type="video/mp4" />
              </video>
            )}
            {!isVideo && (
              <img
                src={data}
                alt="Random dog image"
                className="rounded-md w-96"
              />
            )}
          </div>
        </Container>
      </div>
    </>
  )
}
