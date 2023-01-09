export const parseAuthorization = (token: string | undefined): string | null => {
  if (token == null) return null
  const authorization = token

  const split = authorization.trim().split('Bearer')

  if (split.length !== 2) return null

  const isEmpty = split[1].trim() === ''

  if (isEmpty) return null

  return authorization.split('Bearer')[1].trim()
}
