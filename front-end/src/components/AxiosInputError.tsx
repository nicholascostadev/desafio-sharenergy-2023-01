import { AxiosError } from 'axios'

export const AxiosInputError = ({ error }: { error: unknown }) => {
  if (!(error instanceof AxiosError)) return null

  return (
    <p className="text-red-400">
      {error.response?.status === 401
        ? 'Email ou(e) senha incorreto(s)'
        : 'Erro ao se autenticar, contate o suporte para mais informações'}
    </p>
  )
}
