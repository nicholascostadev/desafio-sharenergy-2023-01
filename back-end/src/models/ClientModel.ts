import { Query } from '../@types/client'
import { Client } from '../entities/Client'

export interface ClientModel {
  getAll: (query: Query) => Promise<Client[]>
  getById: (clientId: string) => Promise<Client | null>
  getByEmail: (email: string) => Promise<Client | null>
}
