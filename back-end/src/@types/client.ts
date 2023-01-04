import { z } from 'zod'
import { querySchema, createClientSchema } from '../validations/client'

export type Query = z.infer<typeof querySchema>
export type CreateProps = z.infer<typeof createClientSchema>
