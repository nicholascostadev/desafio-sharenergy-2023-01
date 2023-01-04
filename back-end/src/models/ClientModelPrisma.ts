import { CreateProps, PaginatedGetReturn, Query } from '../@types/client'
import { prisma } from '../config/prisma'
import { Client as ClientPrisma } from '@prisma/client'
import { ClientModel } from './ClientModel'

export class ClientModelPrisma implements ClientModel {
  getAll = async ({ filter, query, page, perPage }: Query): Promise<PaginatedGetReturn> => {
    const take = perPage ?? 10
    const skip = ((page ?? 1) - 1) * take

    const clients = await prisma.client.findMany({
      where: {
        [filter]: {
          contains: query,
          mode: 'insensitive'
        }
      },
      include: {
        address: true
      },
      skip,
      take
    })

    const clientsCount = await prisma.client.count()
    const totalPages = Math.ceil(clientsCount / take)

    return { clients, totalPages }
  }

  getById = async (clientId: string): Promise<ClientPrisma | null> => {
    const client = await prisma.client.findUnique({
      where: {
        id: clientId
      }
    })

    return client
  }

  getByEmail = async (email: string): Promise<ClientPrisma | null> => {
    const client = await prisma.client.findUnique({
      where: {
        email
      }
    })

    return client
  }

  create = async ({ name, email, address, cpf, telephone }: CreateProps): Promise<ClientPrisma> => {
    const client = await prisma.client.create({
      data: {
        name,
        email,
        cpf,
        telephone,
        address: {
          create: address
        }
      },
      include: {
        address: true
      }
    })

    return client
  }

  update = async (id: string, { name, email, address, cpf, telephone }: CreateProps): Promise<ClientPrisma | null> => {
    const client = await prisma.client.update({
      where: {
        id
      },
      data: {
        name,
        email,
        cpf,
        telephone,
        address: {
          update: address
        }
      },
      include: {
        address: true
      }
    })

    return client
  }

  delete = async (id: string): Promise<ClientPrisma> => {
    const client = await prisma.client.delete({
      where: {
        id
      },
      include: {
        address: true
      }
    })

    return client
  }
}
