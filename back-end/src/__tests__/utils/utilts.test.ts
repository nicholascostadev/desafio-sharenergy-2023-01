import { parseAuthorization } from '../../utils/parseAuthorization'

describe('parseAuthorization', () => {
  it('Should parse a valid token', () => {
    const token = 'Bearer random-token'

    const parsedToken = parseAuthorization(token)

    expect(parsedToken).toStrictEqual('random-token')
  })

  it('Should return null if token is undefined', () => {
    const parsedToken = parseAuthorization(undefined)

    expect(parsedToken).toStrictEqual(null)
  })

  it('Should return null if receives token in invalid format', () => {
    const token = 'random-token'

    const parsedToken = parseAuthorization(token)

    expect(parsedToken).toStrictEqual(null)
  })

  it('Should return null if receives token in invalid format', () => {
    const token = 'Bearer  '

    const parsedToken = parseAuthorization(token)

    console.log({ token, parsedToken })

    expect(parsedToken).toStrictEqual(null)
  })
})
