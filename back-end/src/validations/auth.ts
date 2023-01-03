import { z } from 'zod'

export const loginSchema = z.object({
  login: z.string({
    required_error: 'Login é obrigatório',
    invalid_type_error: 'Login tem que ser to tipo `string`'
  }).min(1, 'Login é obrigatório'),
  password: z.string({
    required_error: 'Senha é obrigatória',
    invalid_type_error: 'Senha tem que ser to tipo `string`'
  }).min(1, 'Senha é obrigatória')
})
