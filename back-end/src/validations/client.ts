import { z } from 'zod'
import { validateCPF } from './cpfValidator'

// "email" | "name"
// http://localhost:4444/clients?filter=name&query=nicholas
// http://localhost:4444/clients?email=nicholascostadev@gmail.com
export const querySchema = z.object({
  filter: z.union([z.literal('email'), z.literal('name')]).default('name'),
  query: z.string().transform(val => val.toLowerCase()).optional(),
  perPage: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1)
})

export const createClientSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name has to be of type `string`',
    required_error: 'Name is required'
  }).min(3).max(100),
  email: z.string({
    invalid_type_error: 'Email has to be of type `string`',
    required_error: 'Email is required'
  }).email({
    message: 'Given email is not valid'
  }),
  cpf: z.string({
    invalid_type_error: 'CPF has to be of type `string`',
    required_error: 'CPF is required'
  }).length(11, {
    message: 'CPF has to have 11 digits'
  }).refine(validateCPF, {
    message: 'Given CPF is not valid'
  }),
  telephone: z.string({
    invalid_type_error: 'Telephone has to be of type `string`',
    required_error: 'Telephone is required'
  }).length(11, {
    message: 'Telephone has to have 11 digits'
  }),
  address: z.object({
    street: z.string({
      invalid_type_error: 'Street has to be of type `string`',
      required_error: 'Street is required'
    }).min(3).max(100),
    city: z.string({
      invalid_type_error: 'City has to be of type `string`',
      required_error: 'City is required'
    }).min(3).max(100),
    state: z.string({
      invalid_type_error: 'State has to be of type `string`',
      required_error: 'State is required'
    }).min(3).max(100),
    zipCode: z.string({
      invalid_type_error: 'zip code has to be of type `string`',
      required_error: 'zip code is required'
    }).length(8),
    number: z.string({
      invalid_type_error: 'Number has to be of type `string`',
      required_error: 'Number is required'
    }).min(1).max(100),
    neighborhood: z.string({
      invalid_type_error: 'Neighborhood has to be of type `string`',
      required_error: 'Neighborhood is required'
    }).min(3).max(100),
    additionalInfo: z.string().min(3).max(100).optional()
  })
})
