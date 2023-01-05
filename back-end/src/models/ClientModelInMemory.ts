import { CreateProps, PaginatedGetReturn, Query } from '../@types/client'

import { ClientModel } from './ClientModel'
import { Client } from '../entities/Client'

export class ClientModelInMemory implements ClientModel {
  clients: Client[] = [
    {
      id: '1',
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
      id: '1',
      name: 'client 1',
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
      id: '1',
      name: 'client 1',
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
      id: '1',
      name: 'client 1',
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

  getAll = async ({ filter, query, page, perPage }: Query): Promise<PaginatedGetReturn> => {
    if (query == null) return await Promise.resolve({ clients: this.clients, totalPages: 0 })

    const clients = this.clients.filter(client => {
      return client[filter].toLowerCase().includes(query.toLowerCase())
    })

    const totalPages = Math.ceil(this.clients.length / (perPage ?? 10))

    return await Promise.resolve({ clients, totalPages })
  }

  getByEmail = async (email: string): Promise<Client | null> => {
    const client = this.clients.find(client => client.email === email)

    return await Promise.resolve(client ?? null)
  }

  getById = async (clientId: string): Promise<Client | null> => {
    const client = this.clients.find(client => client.id === clientId)

    return await Promise.resolve(client ?? null)
  }

  create = async ({ name, email, cpf, address, telephone }: CreateProps): Promise<Client | null> => {
    const client: Client = {
      id: '1',
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

  update = async (id: string, { name, email, cpf, address }: CreateProps): Promise<Client | null> => {
    const client = this.clients.find(client => client.id === id)

    if (client == null) return await Promise.resolve(null)

    client.name = name
    client.email = email
    client.cpf = cpf
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
