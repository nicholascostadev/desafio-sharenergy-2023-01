import { z } from 'zod'
import { validateCPF } from '../utils/cpfValidator'

export const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome tem que ter pelo menos 1 caractere')
    .max(60, 'Nome pode ter no máximo 60 caracteres'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  telephone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .refine(
      (val) => {
        return val.length === 11
      },
      {
        message: 'Telefone inválido',
      },
    ),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos').refine(validateCPF, {
    message: 'CPF informado não existe',
  }),
  address: z.object({
    zipCode: z.string().length(8, 'CEP deve ter 8 dígitos'),
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    additionalInfo: z.string().optional(),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(1, 'Estado é obrigatório'),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  }),
})

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  'remember-me': z.boolean().default(false),
})

export type ClientModalFormData = z.infer<typeof formSchema>
export type LoginFormData = z.infer<typeof loginSchema>
