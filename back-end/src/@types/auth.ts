import { z } from 'zod'
import { loginSchema } from '../validations/auth'

export type LoginInfo = z.infer<typeof loginSchema>
