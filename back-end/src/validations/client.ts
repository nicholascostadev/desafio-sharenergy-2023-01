import { z } from 'zod'
import { validateCPF } from './cpfValidator'

export const querySchema = z.object({
  filter: z.union([z.literal('email'), z.literal('name')]).default('name'),
  query: z.string().transform(val => val.toLowerCase()).optional(),
  perPage: z.string().transform(val => Number(val)).refine(val => val > 0 && val <= 100, {
    message: 'perPage has to be between 1 and 100'
  }).transform(val => val ?? 10).optional(),
  page: z.string().transform(val => Number(val)).refine(val => val > 0, {
    message: 'page has to be greater than 0'
  }).transform(val => val ?? 1).optional()
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
    additionalInfo: z.string().optional()
  })
})
