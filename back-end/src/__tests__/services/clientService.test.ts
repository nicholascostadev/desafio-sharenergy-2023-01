import { mockRequest } from '../utils/interceptors'
import { ClientModelInMemory } from '../../models/ClientModelInMemory'
import { ClientService } from '../../services/ClientService'
import { ZodError } from 'zod'
import { clientFactory } from '../factories/client'

describe('ClientService', () => {
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

  describe('get', () => {
    it('Should throw an error when received perPage is higher than 100', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.query = {
        // forcing validation error
        perPage: '2000'
      }

      try {
        await clientService.get(req)
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
      }
    })

    it('Should throw an error when received page is not greater than 0', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.query = {
        page: '-1'
      }

      try {
        await clientService.get(req)
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
      }
    })

    it('Should call model get when receives a valid query format', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.query = {}

      clientModel.getAll = jest.fn()
      await clientService.get(req)

      expect(clientModel.getAll).toHaveBeenCalledWith({
        perPage: undefined,
        filter: 'name',
        page: undefined,
        query: undefined
      })
    })

    it('Should call model get when receives a valid query format', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.query = {
        perPage: '2'
      }

      clientModel.getAll = jest.fn()
      await clientService.get(req)

      expect(clientModel.getAll).toHaveBeenCalledWith({
        perPage: 2,
        filter: 'name',
        page: undefined,
        query: undefined
      })
    })

    it('Should call model get with filters when requested', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.query = {
        filter: 'name',
        query: 'client 1'
      }

      clientModel.getAll = jest.fn()
      await clientService.get(req)

      expect(clientModel.getAll).toHaveBeenCalledWith({
        filter: 'name',
        query: 'client 1'
      })
    })
  })

  describe('getById', () => {
    it('Should throw an error when received id is not a valid uuid', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.params = {
        clientId: 'invalid-uuid'
      }

      try {
        await clientService.getById(req)
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
      }
    })

    it('Should call model getById if receives a valid clientId, but no user matches', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      // valid uuid but not in database
      const clientId = '7fd57c77-d5d6-409f-b9b6-848158e0c1ac'
      req.params = {
        clientId
      }

      clientModel.getById = jest.fn()
      await clientService.getById(req)

      expect(clientModel.getById).toHaveBeenCalledWith(clientId)
    })
  })

  describe('create', () => {
    it('Should throw an error when received empty body', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.body = {}

      try {
        await clientService.create(req)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        expect(err).toHaveProperty('issues')
        expect(err).toHaveProperty('message')
      }
    })

    it('Should throw an error when received name is not a string', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.body = clientFactory()
      req.body.name = 12

      try {
        await clientService.create(req)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        expect(err).toHaveProperty('issues')
        expect(err).toHaveProperty('message')
      }
    })

    it('Should throw an error when received email is not valid', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.body = clientFactory()
      req.body.email = 'invalid-email'

      try {
        await clientService.create(req)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        expect(err).toHaveProperty('issues')
        expect(err).toHaveProperty('message')
      }
    })

    it('Should throw an error when received cpf is not valid', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.body = clientFactory()
      req.body.cpf = '13413412342'

      try {
        await clientService.create(req)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        expect(err).toHaveProperty('issues')
        expect(err).toHaveProperty('message')
      }
    })

    it('Should throw an error when received telephone is not valid', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.body = clientFactory()
      req.body.telephone = '1231231231'

      try {
        await clientService.create(req)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        expect(err).toHaveProperty('issues')
        expect(err).toHaveProperty('message')
      }
    })

    it('Should call model create if passes through all validations', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.body = clientFactory()

      clientModel.create = jest.fn()
      await clientService.create(req)

      expect(clientModel.create).toHaveBeenCalledWith(req.body)
    })
  })

  describe('update', () => {
    it('Should throw an error when received empty body', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.body = {}

      try {
        await clientService.update(req)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        expect(err).toHaveProperty('issues')
        expect(err).toHaveProperty('message')
      }
    })

    it('Should throw an error when received name is not a string', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.body = clientFactory()
      req.body.name = 12

      try {
        await clientService.update(req)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        expect(err).toHaveProperty('issues')
        expect(err).toHaveProperty('message')
      }
    })

    it('Should throw an error when received email is not valid', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.body = clientFactory()
      req.body.email = 'emailexample.com'

      try {
        await clientService.update(req)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        expect(err).toHaveProperty('issues')
        expect(err).toHaveProperty('message')
      }
    })

    it('Should throw an error when received cpf is not valid', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.body = clientFactory()
      req.body.cpf = '45165122222'

      try {
        await clientService.update(req)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        expect(err).toHaveProperty('issues')
        expect(err).toHaveProperty('message')
      }
    })

    it('Should throw an error when received telephone is not valid', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.body = clientFactory()
      req.body.telephone = '1231231231'

      try {
        await clientService.update(req)
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)
        expect(err).toHaveProperty('issues')
        expect(err).toHaveProperty('message')
      }
    })

    it('Should call model update if passes through all validations', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)
      req.params.clientId = '22e5be91-621c-4cd5-a49c-c14d0567fbd2'
      req.body = clientFactory()
      req.body.id = '8c5ab51d-76d9-45a7-bf58-d97185b9eebf'

      clientModel.update = jest.fn()
      await clientService.update(req)

      expect(clientModel.update).not.toHaveBeenCalledWith(req.body)
    })
  })

  describe('delete', () => {
    it('Should return null when received clientId is not found', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)
      req.params.clientId = '03fe8149-06d0-4eb5-bc9b-3f15a53945fe'

      const deleted = await clientService.delete(req)

      expect(deleted).toStrictEqual(null)
    })

    it('Should call model delete', async () => {
      const clientModel = new ClientModelInMemory()
      const clientService = new ClientService(clientModel)

      req.params.clientId = '8c5ab51d-76d9-45a7-bf58-d97185b9eebf'

      clientModel.delete = jest.fn()
      await clientService.delete(req)

      expect(clientModel.delete).toHaveBeenCalledWith(req.params.clientId)
    })
  })
})
