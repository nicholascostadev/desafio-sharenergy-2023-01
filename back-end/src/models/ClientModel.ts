import { Query, CreateProps, PaginatedGetReturn } from '../@types/client'
import { Client } from '../entities/Client'

export interface ClientModel {
  getAll: (query: Query) => Promise<PaginatedGetReturn>
  getById: (clientId: string) => Promise<Client | null>
  create: (props: CreateProps) => Promise<Client | null>
  update: (id: string, props: CreateProps) => Promise<Client | null>
  delete: (id: string) => Promise<Client | null>
}
