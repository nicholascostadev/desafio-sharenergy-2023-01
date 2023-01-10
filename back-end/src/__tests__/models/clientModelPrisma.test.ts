import { faker } from '@faker-js/faker'
import { Client } from '../../entities/Client'
import { ClientModelPrisma } from '../../models/ClientModelPrisma'
import { clientFactory } from '../factories/client'

const getAllClients = async (model: ClientModelPrisma): Promise<Client[]> => {
  return await model.getAll({
    filter: 'name'
  }).then(response => response.clients)
}

const createClient = async (model: ClientModelPrisma, data: ReturnType<typeof clientFactory>): Promise<Client> => {
  return await model.create(data)
}

describe('ClientModel', () => {
  describe('create', () => {
    it('should create a client with the correct values', async () => {
      const clientModelPrisma = new ClientModelPrisma()
      const initialLength = await getAllClients(clientModelPrisma).then(clients => clients.length)

      const client = clientFactory()

      const newClient = await clientModelPrisma.create(client)

      expect(newClient).toHaveProperty('id')
      expect(newClient).toHaveProperty('name', client.name)
      expect(newClient).toHaveProperty('email', client.email)
      expect(newClient).toHaveProperty('cpf', client.cpf)
      expect(newClient).toHaveProperty('telephone', client.telephone)
      expect(newClient).toHaveProperty('address', expect.objectContaining(client.address))
      expect(await getAllClients(clientModelPrisma)).toHaveLength(initialLength + 1)

      await clientModelPrisma.delete(newClient.id)
    })
  })

  describe('getById', () => {
    it('should return a client by id', async () => {
      const clientModelPrisma = new ClientModelPrisma()

      const createdClient = await createClient(clientModelPrisma, clientFactory())
      const clientToFind = createdClient

      const foundClient = await clientModelPrisma.getById(clientToFind.id)

      expect(foundClient).toHaveProperty('id', clientToFind.id)
      expect(foundClient).toHaveProperty('name', clientToFind.name)
      expect(foundClient).toHaveProperty('email', clientToFind.email)
      expect(foundClient).toHaveProperty('cpf', clientToFind.cpf)
      expect(foundClient).toHaveProperty('telephone', clientToFind.telephone)
      expect(foundClient).toHaveProperty('address', clientToFind.address)

      await clientModelPrisma.delete(createdClient.id)
    })

    it('should throw an error if client is not found', async () => {
      try {
        const clientModelPrisma = new ClientModelPrisma()

        await clientModelPrisma.getById(faker.database.mongodbObjectId())
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
      }
    })
  })

  describe('update', () => {
    it('should update a client with the correct values', async () => {
      const clientModelPrisma = new ClientModelPrisma()

      const clientToUpdate = await createClient(clientModelPrisma, clientFactory())

      const client = clientFactory()

      const updatedClient = await clientModelPrisma.update(clientToUpdate.id, client)

      expect(updatedClient).toHaveProperty('id', clientToUpdate.id)
      expect(updatedClient).toHaveProperty('name', client.name)
      expect(updatedClient).toHaveProperty('email', client.email)
      expect(updatedClient).toHaveProperty('cpf', client.cpf)
      expect(updatedClient).toHaveProperty('telephone', client.telephone)
      expect(updatedClient).toHaveProperty('address', expect.objectContaining(client.address))

      await clientModelPrisma.delete(clientToUpdate.id)
    })

    it('should throw an error if client is not found when updating', async () => {
      try {
        const clientModelPrisma = new ClientModelPrisma()

        const client = clientFactory()

        await clientModelPrisma.update(faker.database.mongodbObjectId(), client)
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
      }
    })
  })

  describe('delete', () => {
    it('should delete a client', async () => {
      const clientModelPrisma = new ClientModelPrisma()

      const clientToDelete = await createClient(clientModelPrisma, clientFactory())

      const deletedClient = await clientModelPrisma.delete(clientToDelete.id)

      expect(deletedClient).toHaveProperty('id', clientToDelete.id)
      expect(deletedClient).toHaveProperty('name', clientToDelete.name)
      expect(deletedClient).toHaveProperty('email', clientToDelete.email)
      expect(deletedClient).toHaveProperty('cpf', clientToDelete.cpf)
      expect(deletedClient).toHaveProperty('telephone', clientToDelete.telephone)
      expect(deletedClient).toHaveProperty('address', clientToDelete.address)
    })

    it('should throw an error if client is not found when deleting', async () => {
      try {
        const clientModelPrisma = new ClientModelPrisma()

        await clientModelPrisma.delete(faker.database.mongodbObjectId())
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
      }
    })
  })

  describe('get', () => {
    it('should the clients by the search term', async () => {
      const clientModelPrisma = new ClientModelPrisma()

      const firstClient = await createClient(clientModelPrisma, clientFactory({ name: 'Mark Harrison' }))
      const secondClient = await createClient(clientModelPrisma, clientFactory({ name: 'Harrison Wells' }))

      const searchTerm = 'Harrison'

      const foundClients = await clientModelPrisma.getAll({
        filter: 'name',
        query: searchTerm
      }).then(data => data.clients)

      expect(foundClients).toHaveLength(2)

      await Promise.resolve([
        clientModelPrisma.delete(firstClient.id),
        clientModelPrisma.delete(secondClient.id)
      ])
    })

    it('should return all clients when no query', async () => {
      const clientModelPrisma = new ClientModelPrisma()

      const clientsLength = await getAllClients(clientModelPrisma).then(clients => clients.length)

      const foundClients = await clientModelPrisma.getAll({
        filter: 'name'
      }).then(data => data.clients)

      expect(foundClients).toHaveLength(clientsLength)
    })

    it('should return an empty array if no user found with given query', async () => {
      const clientModelPrisma = new ClientModelPrisma()

      const foundClients = await clientModelPrisma.getAll({
        filter: 'name',
        query: 'random-string'
      }).then(data => data.clients)

      expect(foundClients).toHaveLength(0)
    })
  })
})
