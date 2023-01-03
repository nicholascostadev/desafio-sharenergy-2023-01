import { Query } from '../@types/client'
import { prisma } from '../config/prisma'
import { Client as ClientPrisma } from '@prisma/client'
import { ClientModel } from './ClientModel'

export class ClientModelPrisma implements ClientModel {
  getAll = async ({ filter, query, page, perPage }: Query): Promise<ClientPrisma[]> => {
    const clients = await prisma.client.findMany({
      where: {
        [filter]: {
          contains: query,
          mode: 'insensitive'
        }
      },
      skip: (page - 1) * perPage,
      take: perPage
    })

    return clients
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
}
