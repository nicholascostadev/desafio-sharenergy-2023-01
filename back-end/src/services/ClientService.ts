import { Request } from 'express'
import { createClientSchema, querySchema } from '../validations/client'
import { ClientModel } from '../models/ClientModel'

export class ClientService {
  constructor (private readonly clientModel: ClientModel) {}

  get = async (req: Request) => {
    const { filter, query, page, perPage } = querySchema.parse(req.query)

    return await this.clientModel.getAll({ filter, query, page, perPage })
  }

  getById = async (req: Request) => {
    const { clientId } = req.params

    const clients = await this.clientModel.getById(clientId)

    return clients
  }

  create = async (req: Request) => {
    const { name, email, address, cpf, telephone } = createClientSchema.parse(req.body)

    const client = await this.clientModel.create({ name, email, address, cpf, telephone })

    return client
  }

  update = async (req: Request) => {
    const { clientId } = req.params
    const { name, email, address, cpf, telephone } = createClientSchema.parse(req.body)

    const updatedClient = await this.clientModel.update(clientId, { name, email, address, cpf, telephone })

    return updatedClient
  }

  delete = async (req: Request) => {
    const { clientId } = req.params

    const deletedClient = await this.clientModel.delete(clientId)

    return deletedClient
  }
}
