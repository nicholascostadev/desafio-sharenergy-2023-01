import { CreateProps, PaginatedGetReturn, Query } from '../@types/client'

import { ClientModel } from './ClientModel'
import { Client } from '../entities/Client'

export class ClientModelInMemory implements ClientModel {
  clients: Client[] = [
    {
      id: '8c5ab51d-76d9-45a7-bf58-d97185b9eebf',
      name: 'client 1',
      email: 'adaskjd@gmaiol.com',
      cpf: '12345678910',
      telephone: '123456789101',
      address: {
        street: 'street 1',
        number: '1',
        additionalInfo: 'complement 1',
        neighborhood: 'neighborhood 1',
        city: 'city 1',
        state: 'state 1',
        zipCode: 'zipCode 1'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2c2ee694-86ed-45bf-9b8d-5aa777825f71',
      name: 'Michael Harrison',
      cpf: '12345678910',
      email: 'adaskjd@gmaiol.com',
      telephone: '123456789101',
      address: {
        street: 'street 1',
        number: '1',
        additionalInfo: 'complement 1',
        neighborhood: 'neighborhood 1',
        city: 'city 1',
        state: 'state 1',
        zipCode: 'zipCode 1'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '30ac45c2-c203-4baa-9bc1-28d00716f811',
      name: 'Michael',
      cpf: '12345678910',
      email: 'adaskjd@gmaiol.com',
      telephone: '123456789101',
      address: {
        street: 'street 1',
        number: '1',
        additionalInfo: 'complement 1',
        neighborhood: 'neighborhood 1',
        city: 'city 1',
        state: 'state 1',
        zipCode: 'zipCode 1'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '027fb863-172a-4085-8d48-a68d98dac1bb',
      name: 'Harrison',
      email: 'adaskjd@gmaiol.com',
      telephone: '123456789101',
      cpf: '12345678910',
      address: {
        street: 'street 1',
        number: '1',
        additionalInfo: 'complement 1',
        neighborhood: 'neighborhood 1',
        city: 'city 1',
        state: 'state 1',
        zipCode: 'zipCode 1'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  getAll = async ({ filter, query, page = 1, perPage }: Query): Promise<PaginatedGetReturn> => {
    const totalPages = Math.ceil(this.clients.length / (perPage ?? 10))

    if (query == null) return await Promise.resolve({ clients: this.clients.slice(0, perPage), totalPages })

    const filteredClients = this.clients.filter(client => {
      return client[filter].toLowerCase().includes(query.toLowerCase())
    })

    return await Promise.resolve({ clients: filteredClients, totalPages })
  }

  getById = async (clientId: string): Promise<Client | null> => {
    const client = this.clients.find(client => client.id === clientId)

    return await Promise.resolve(client ?? null)
  }

  create = async ({ name, email, cpf, address, telephone }: CreateProps): Promise<Client | null> => {
    const client: Client = {
      id: crypto.randomUUID(),
      name,
      email,
      cpf,
      telephone,
      address: {
        ...address,
        additionalInfo: address.additionalInfo ?? null,
        neighborhood: address.neighborhood ?? null
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.clients.push(client)

    return await Promise.resolve(client)
  }

  update = async (id: string, { name, email, cpf, telephone, address }: CreateProps): Promise<Client | null> => {
    const client = this.clients.find(client => client.id === id)

    if (client == null) return await Promise.resolve(null)

    client.name = name
    client.email = email
    client.cpf = cpf
    client.telephone = telephone
    client.address = {
      ...address,
      additionalInfo: address.additionalInfo ?? null,
      neighborhood: address.neighborhood ?? null
    }
    client.updatedAt = new Date()

    return await Promise.resolve(client)
  }

  delete = async (id: string): Promise<Client | null> => {
    const client = this.clients.find(client => client.id === id)

    if (client == null) return await Promise.resolve(null)

    this.clients = this.clients.filter(client => client.id !== id)

    return await Promise.resolve(client)
  }
}
