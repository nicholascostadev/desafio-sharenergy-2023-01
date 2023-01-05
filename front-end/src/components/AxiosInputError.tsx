import { AxiosError } from 'axios'
import { ErrorText } from './ErrorText'

export const AxiosInputError = ({ error }: { error: unknown }) => {
  if (!(error instanceof AxiosError)) return null

  return (
    <ErrorText>
      {error.response?.status === 401
        ? 'Email ou(e) senha incorreto(s)'
        : 'Erro ao se autenticar, contate o suporte para mais informações'}
    </ErrorText>
  )
}
