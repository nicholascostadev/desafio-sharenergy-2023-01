import { AuthController } from '../../controllers/AuthController'
import { mockNext, mockRequest, mockResponse } from '../utils/interceptors'

describe('AuthController', () => {
  const env = process.env
  let req = mockRequest()
  let res = mockResponse()
  let next = mockNext()

  beforeEach(() => {
    req = mockRequest()
    res = mockResponse()
    next = mockNext()

    process.env = { ...env }
    process.env.AUTH_SECRET = 'asdasd'
  })

  afterEach(() => {
    process.env = env
  })

  describe('login', () => {
    it('Should return 400 when received data is not valid', async () => {
      const authController = new AuthController()

      req.body = {
        login: '',
        password: ''
      }

      authController.login(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Validation Error'
      }))
    })

    it('Should return 401 when received wrong login or password', async () => {
      const authController = new AuthController()

      req.body = {
        login: 'asdfasdf',
        password: 'gasdfasfda'
      }

      authController.login(req, res, next)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error',
        error: 'Wrong email or password'
      }))
    })
  })

  describe('validateToken', () => {
    it('Should return 200 when received correct login and password', async () => {
      const authController = new AuthController()

      req.body = {
        login: 'desafiosharenergy',
        password: 'sh@r3n3rgy'
      }

      authController.login(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Success',
        token: expect.any(String)
      }))
    })

    it('Should return 401 + zodError when token does not pass zod validation', () => {
      const authController = new AuthController()

      req.body = {
        jwtToken: ''
      }

      authController.validateToken(req, res, next)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error',
        error: expect.any(String)
      }))
    })

    it('Should return 401 when token is not valid', () => {
      const authController = new AuthController()

      req.body = {
        jwtToken: 'fasdfasdf'
      }

      authController.validateToken(req, res, next)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error',
        error: 'Unauthorized - Invalid token'
      }))
    })
  })
})
