import { z } from 'zod'
import { querySchema, createClientSchema } from '../validations/client'
import { Client } from '../entities/Client'

export type Query = z.infer<typeof querySchema>
export type CreateProps = z.infer<typeof createClientSchema>
export interface PaginatedGetReturn {
  clients: Client[]
  totalPages: number
}
