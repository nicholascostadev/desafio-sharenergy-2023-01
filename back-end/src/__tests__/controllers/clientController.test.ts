import { mockNext, mockRequest, mockResponse } from '../utils/interceptors'
import { ClientController } from '../../controllers/ClientController'
import { ZodError } from 'zod'

const serviceGet = jest.fn()
const serviceGetById = jest.fn()
const serviceCreate = jest.fn()
const serviceUpdate = jest.fn()
const serviceDelete = jest.fn()

jest.mock('../../services/ClientService', () => {
  return {
    ClientService: function () {
      return {
        get: (req: any, res: any, next: any) => serviceGet(req),
        getById: (req: any, res: any, next: any) => serviceGetById(req),
        create: (req: any, res: any, next: any) => serviceCreate(req),
        update: (req: any, res: any, next: any) => serviceUpdate(req),
        delete: (req: any, res: any, next: any) => serviceDelete(req)
      }
    }
  }
})

const clientController = new ClientController()

describe('ClientController', () => {
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

  describe('get', () => {
    it('Should call service with req', async () => {
      serviceGet.mockImplementationOnce((req: any, res: any, next: any) => 'token')

      await clientController.get(req, res, next)

      expect(serviceGet).toHaveBeenCalledWith(req)
    })

    it('Should return 200 when received data is valid', async () => {
      serviceGet.mockImplementationOnce((req: any, res: any, next: any) => 'data')

      await clientController.get(req, res, next)

      expect(serviceGet).toHaveBeenCalledWith(req)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Success',
        data: 'data'
      })
    })

    it('Should return 400 when there is an error', async () => {
      serviceGet.mockImplementationOnce((req: any, res: any, next: any) => {
        throw new Error()
      })

      await clientController.get(req, res, next)

      expect(serviceGet).toHaveBeenCalledWith(req)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error'
      }))
    })

    it('Should return 400 when there is a ZodError', async () => {
      serviceGet.mockImplementationOnce((req: any, res: any, next: any) => {
        throw new ZodError([])
      })

      await clientController.get(req, res, next)

      expect(serviceGet).toHaveBeenCalledWith(req)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Validation Error'
      }))
    })
  })

  describe('getById', () => {
    it('Should call service with req', async () => {
      serviceGetById.mockImplementationOnce((req: any, res: any, next: any) => 'token')

      await clientController.getById(req, res, next)

      expect(serviceGetById).toHaveBeenCalledWith(req)
    })

    it('Should return 200 when received data is valid', async () => {
      serviceGetById.mockImplementationOnce((req: any, res: any, next: any) => 'data')

      await clientController.getById(req, res, next)

      expect(serviceGetById).toHaveBeenCalledWith(req)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Success',
        data: 'data'
      })
    })

    it('Should return 400 when there is an error', async () => {
      serviceGetById.mockImplementationOnce((req: any, res: any, next: any) => {
        throw new Error()
      })

      await clientController.getById(req, res, next)

      expect(serviceGetById).toHaveBeenCalledWith(req)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error'
      }))
    })
  })

  describe('create', () => {
    it('Should call service with req', async () => {
      serviceCreate.mockImplementationOnce((req: any, res: any, next: any) => 'token')

      await clientController.create(req, res, next)

      expect(serviceCreate).toHaveBeenCalledWith(req)
    })

    it('Should return 200 when received data is valid', async () => {
      serviceCreate.mockImplementationOnce((req: any, res: any, next: any) => 'data')

      await clientController.create(req, res, next)

      expect(serviceCreate).toHaveBeenCalledWith(req)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Success',
        data: 'data'
      })
    })

    it('Should return 400 when there is an error', async () => {
      serviceCreate.mockImplementationOnce((req: any, res: any, next: any) => {
        throw new Error()
      })

      await clientController.create(req, res, next)

      expect(serviceCreate).toHaveBeenCalledWith(req)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error'
      }))
    })
  })

  describe('update', () => {
    it('Should call service with req', async () => {
      serviceUpdate.mockImplementationOnce((req: any, res: any, next: any) => 'token')

      await clientController.update(req, res, next)

      expect(serviceUpdate).toHaveBeenCalledWith(req)
    })

    it('Should return 200 when received data is valid', async () => {
      serviceUpdate.mockImplementationOnce((req: any, res: any, next: any) => 'data')

      await clientController.update(req, res, next)

      expect(serviceUpdate).toHaveBeenCalledWith(req)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Success',
        data: 'data'
      })
    })

    it('Should return 400 when there is an error', async () => {
      serviceUpdate.mockImplementationOnce((req: any, res: any, next: any) => {
        throw new Error()
      })

      await clientController.update(req, res, next)

      expect(serviceUpdate).toHaveBeenCalledWith(req)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error'
      }))
    })
  })

  describe('delete', () => {
    it('Should call service with req', async () => {
      serviceDelete.mockImplementationOnce((req: any, res: any, next: any) => 'token')

      await clientController.delete(req, res, next)

      expect(serviceDelete).toHaveBeenCalledWith(req)
    })

    it('Should return 200 when received data is valid', async () => {
      serviceDelete.mockImplementationOnce((req: any, res: any, next: any) => 'data')

      await clientController.delete(req, res, next)

      expect(serviceDelete).toHaveBeenCalledWith(req)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Success',
        data: 'data'
      })
    })

    it('Should return 400 when there is an error', async () => {
      serviceDelete.mockImplementationOnce((req: any, res: any, next: any) => {
        throw new Error()
      })

      await clientController.delete(req, res, next)

      expect(serviceDelete).toHaveBeenCalledWith(req)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error'
      }))
    })
  })
})
