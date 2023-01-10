import { authMiddleware } from '../../middlewares/authMiddleware'
import { mockRequest, mockNext, mockResponse } from '../utils/interceptors'
import jwt from 'jsonwebtoken'

describe('AuthMidleware', () => {
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

  it('Should not allow to continue when user does not have an authorization token', () => {
    req.header = (name: string) => undefined

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error',
      error: 'Unauthorized - No token received'
    })
  })

  it('Should not allow to continue when user token is invalid', () => {
    // jwt taken from https://www.jwt.io
    req.header = (name: string) => 'Bearer asdfasdfasfasdfaf'

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error',
      error: 'Unauthorized - Invalid token'
    })
  })

  it('Should allow to continue when user token is valid', () => {
    // jwt taken from https://www.jwt.io
    const validToken = jwt.sign({ username: 'test-user' }, process.env.AUTH_SECRET as string, { expiresIn: '1d' })
    req.header = (name: string) => `Bearer ${validToken}`

    authMiddleware(req, res, next)

    expect(next).toHaveBeenCalled()
  })
})
