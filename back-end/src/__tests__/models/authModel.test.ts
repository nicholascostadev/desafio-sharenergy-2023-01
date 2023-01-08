import { AuthModelStatic } from '../../models/AuthModelStatic'
import jwt from 'jsonwebtoken'

describe('AuthService', () => {
  const env = process.env

  beforeEach(() => {
    process.env = { ...env }
    process.env.AUTH_SECRET = 'asdasd'
  })

  afterEach(() => {
    process.env = env
  })

  describe('login', () => {
    it('Should throw an error when receives wrong email or password', async () => {
      const authModelStatic = new AuthModelStatic()

      const fakeLogin = 'fadadsfdfa'
      const fakePassword = 'agfasdfasf'

      try {
        authModelStatic.login(fakeLogin, fakePassword)
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
        expect(err).toHaveProperty('message', 'Wrong email or password')
      }
    })

    it('Should return a token when receives right email or password', async () => {
      const authModelStatic = new AuthModelStatic()

      const fakeLogin = 'desafiosharenergy'
      const fakePassword = 'sh@r3n3rgy'

      const data = authModelStatic.login(fakeLogin, fakePassword)

      expect(data).toBeTruthy()
    })
  })

  describe('validateToken', () => {
    const authModelStatic = new AuthModelStatic()

    it('Should throw an error when receives invalid token', async () => {
      const fakeToken = ''

      try {
        authModelStatic.validateToken(fakeToken)
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
        expect(err).toHaveProperty('message', 'Unauthorized - Invalid token')
      }
    })

    it('Should throw an error when received a valid token with wrong signature', async () => {
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pY2hvbGFzY29zdGEifQ.5XspYqDupwy6Ozc3EI4VC4aAAuNv7k2dxg1wRSnoNko'

      try {
        authModelStatic.validateToken(fakeToken)
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
        expect(err).toHaveProperty('message', 'Unauthorized - Invalid token')
      }
    })

    it('Should should return the token if it has a valid signature', async () => {
      const fakeToken = jwt.sign({ username: 'desafiosharenergy' }, process.env.AUTH_SECRET as string, { expiresIn: '1d' })

      const token = authModelStatic.validateToken(fakeToken)

      expect(token).toBeTruthy()
      expect(token).toHaveProperty('username', 'desafiosharenergy')
    })
  })
})
