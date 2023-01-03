import { z } from 'zod'

export const loginSchema = z.object({
  login: z.string({
    required_error: 'Login is required',
    invalid_type_error: 'Login has to be of type `string`'
  }).min(1, 'Login id required'),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password has to be of type `string`'
  }).min(1, 'Password is required')
})
