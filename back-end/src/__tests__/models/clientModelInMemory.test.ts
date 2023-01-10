import { ClientModelInMemory } from '../../models/ClientModelInMemory'
import { clientFactory } from '../factories/client'

describe('ClientModel', () => {
  describe('create', () => {
    it('should create a client with the correct values', async () => {
      const clientModelInMemory = new ClientModelInMemory()
      const initialLength = clientModelInMemory.clients.length

      const client = clientFactory()

      const newClient = await clientModelInMemory.create(client)

      expect(newClient).toHaveProperty('id')
      expect(newClient).toHaveProperty('name', client.name)
      expect(newClient).toHaveProperty('email', client.email)
      expect(newClient).toHaveProperty('cpf', client.cpf)
      expect(newClient).toHaveProperty('telephone', client.telephone)
      expect(newClient).toHaveProperty('address', client.address)
      expect(clientModelInMemory.clients).toHaveLength(initialLength + 1)
    })
  })

  describe('getById', () => {
    it('should return a client by id', async () => {
      const clientModelInMemory = new ClientModelInMemory()

      const clientToFind = clientModelInMemory.clients[1]

      const foundClient = await clientModelInMemory.getById(clientToFind.id)

      expect(foundClient).toHaveProperty('id', clientToFind.id)
      expect(foundClient).toHaveProperty('name', clientToFind.name)
      expect(foundClient).toHaveProperty('email', clientToFind.email)
      expect(foundClient).toHaveProperty('cpf', clientToFind.cpf)
      expect(foundClient).toHaveProperty('telephone', clientToFind.telephone)
      expect(foundClient).toHaveProperty('address', clientToFind.address)
    })

    it('should return null if client is not found', async () => {
      const clientModelInMemory = new ClientModelInMemory()

      const foundClient = await clientModelInMemory.getById('invalid-id')

      expect(foundClient).toBeNull()
    })
  })

  describe('update', () => {
    it('should update a client with the correct values', async () => {
      const clientModelInMemory = new ClientModelInMemory()

      const clientToUpdate = clientModelInMemory.clients[1]

      const client = clientFactory()

      const updatedClient = await clientModelInMemory.update(clientToUpdate.id, client)

      expect(updatedClient).toHaveProperty('id', clientToUpdate.id)
      expect(updatedClient).toHaveProperty('name', client.name)
      expect(updatedClient).toHaveProperty('email', client.email)
      expect(updatedClient).toHaveProperty('cpf', client.cpf)
      expect(updatedClient).toHaveProperty('telephone', client.telephone)
      expect(updatedClient).toHaveProperty('address', client.address)
    })

    it('should return null if client is not found when updating', async () => {
      const clientModelInMemory = new ClientModelInMemory()

      const client = clientFactory()

      const updatedClient = await clientModelInMemory.update('invalid-id', client)

      expect(updatedClient).toBeNull()
    })
  })

  describe('delete', () => {
    it('should delete a client', async () => {
      const clientModelInMemory = new ClientModelInMemory()

      const clientToDelete = clientModelInMemory.clients[1]

      const deletedClient = await clientModelInMemory.delete(clientToDelete.id)

      expect(deletedClient).toHaveProperty('id', clientToDelete.id)
      expect(deletedClient).toHaveProperty('name', clientToDelete.name)
      expect(deletedClient).toHaveProperty('email', clientToDelete.email)
      expect(deletedClient).toHaveProperty('cpf', clientToDelete.cpf)
      expect(deletedClient).toHaveProperty('telephone', clientToDelete.telephone)
      expect(deletedClient).toHaveProperty('address', clientToDelete.address)
      expect(clientModelInMemory.clients).not.toEqual(expect.objectContaining(clientToDelete))
    })

    it('should return null if client is not found when deleting', async () => {
      const clientModelInMemory = new ClientModelInMemory()

      const deletedClient = await clientModelInMemory.delete('invalid-id')

      expect(deletedClient).toBeNull()
    })
  })

  describe('get', () => {
    it('should the clients by the search term', async () => {
      const clientModelInMemory = new ClientModelInMemory()

      const searchTerm = 'Harrison'

      const foundClients = await clientModelInMemory.getAll({
        filter: 'name',
        query: searchTerm
      }).then(data => data.clients)

      expect(foundClients).toHaveLength(2)
    })

    it('should return all clients', async () => {
      const clientModelInMemory = new ClientModelInMemory()

      const foundClients = await clientModelInMemory.getAll({
        filter: 'name'
      }).then(data => data.clients)

      expect(foundClients).toHaveLength(4)
    })

    it('should return an empty array if no user found with given query', async () => {
      const clientModelInMemory = new ClientModelInMemory()

      const foundClients = await clientModelInMemory.getAll({
        filter: 'name',
        query: 'random-string'
      }).then(data => data.clients)

      expect(foundClients).toHaveLength(0)
    })
  })
})
