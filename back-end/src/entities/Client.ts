import { Address } from '@prisma/client'

export interface Client {
  id: string
  name: string
  email: string
  cpf: string
  telephone: string
  address?: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>
  createdAt: Date
  updatedAt: Date
}
