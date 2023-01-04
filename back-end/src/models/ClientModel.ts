import { Query, CreateProps } from '../@types/client'
import { Client } from '../entities/Client'

export interface ClientModel {
  getAll: (query: Query) => Promise<Client[]>
  getById: (clientId: string) => Promise<Client | null>
  getByEmail: (email: string) => Promise<Client | null>
  create: (props: CreateProps) => Promise<Client | null>
  update: (id: string, props: CreateProps) => Promise<Client | null>
  delete: (id: string) => Promise<Client | null>
}
