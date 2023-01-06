export const parseAuthorization = (token: string | undefined): string | null => {
  if (token == null) return null
  const authorization = token
  if (authorization == null) {
    return null
  }

  const split = authorization.split('Bearer')

  if (split.length !== 2) return null

  return authorization.split('Bearer')[1].trim()
}
