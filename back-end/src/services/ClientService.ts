import { Request } from 'express'
import { querySchema } from '../validations/client'
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

  getByEmail = async (req: Request) => {
    // at this point, we know it's a string and can cast it
    // because it's only called after we've validated the query
    // params at the `get` method
    const email = req.query.email as string

    const clients = await this.clientModel.getByEmail(email)

    return clients
  }
}
