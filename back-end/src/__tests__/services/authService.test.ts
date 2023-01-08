import { mockRequest } from '../utils/interceptors'
import { AuthService } from '../../services/AuthService'
import { AuthModelStatic } from '../../models/AuthModelStatic'

describe('AuthService', () => {
  const env = process.env
  let req = mockRequest()

  beforeEach(() => {
    req = mockRequest()

    process.env = { ...env }
    process.env.AUTH_SECRET = 'asdasd'
  })

  afterEach(() => {
    process.env = env
  })

  describe('login', () => {
    it('Should throw an error when received data is not in a valid format', async () => {
      const authModelStatic = new AuthModelStatic()

      const authService = new AuthService(authModelStatic)

      req.body = {
        login: '',
        password: ''
      }
      try {
        authService.login(req)
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
        expect(err).toHaveProperty('message')
      }
    })

    it('Should call the login method in model when receives data in a valid format', async () => {
      const authModelStatic = new AuthModelStatic()
      const authService = new AuthService(authModelStatic)

      req.body = {
        login: 'fasdfasdf',
        password: 'adsfasdfa'
      }

      authModelStatic.login = jest.fn()

      authService.login(req)

      expect(authModelStatic.login).toHaveBeenCalledWith(req.body.login, req.body.password)
    })
  })

  describe('validateToken', () => {
    it('Should throw an error when received data is not in a valid format', async () => {
      const authModelStatic = new AuthModelStatic()

      const authService = new AuthService(authModelStatic)

      authModelStatic.login = jest.fn()

      req.body = {
        jwtToken: ''
      }

      try {
        authService.login(req)
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
        expect(err).toHaveProperty('message')
      }
    })

    it('Should call the validateToken method in model when receives data in a valid format', async () => {
      const authModelStatic = new AuthModelStatic()
      const authService = new AuthService(authModelStatic)

      req.body = {
        jwtToken: 'asdfasdf'
      }

      authModelStatic.validateToken = jest.fn()

      authService.validateToken(req)

      expect(authModelStatic.validateToken).toHaveBeenCalledWith(req.body.jwtToken)
    })
  })
})
