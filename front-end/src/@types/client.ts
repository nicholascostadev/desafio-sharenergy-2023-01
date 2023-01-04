export type Address = {
  id: string
  street: string
  city: string
  state: string
  zipCode: string
  number: string
  neighborhood: string
  additionalInfo?: string
  createdAt: string
  updatedAt: string
}

export type Client = {
  id: string
  name: string
  email: string
  telephone: string
  cpf: string
  createdAt: string
  updatedAt: string
  addressId: string
  address: Address
}
