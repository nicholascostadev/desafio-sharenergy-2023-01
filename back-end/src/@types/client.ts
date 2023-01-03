import { z } from 'zod'
import { querySchema } from '../validations/client'

export type Query = z.infer<typeof querySchema>
