export const parseAuthorization = (token: string | undefined): string | null => {
  if (token == null) return null
  const authorization = String(token).trim()

  return authorization.split('Bearer')[1].trim()
}
