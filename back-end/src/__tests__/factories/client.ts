import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'
interface ClientFactoryProps {
  name?: string
}

export const clientFactory = (props?: ClientFactoryProps) => ({
  name: props?.name ?? faker.name.fullName(),
  email: faker.internet.email(),
  telephone: faker.phone.number('###########'),
  cpf: generate(),
  address: {
    street: faker.address.street(),
    number: faker.address.buildingNumber(),
    additionalInfo: 'fake additional info',
    neighborhood: 'fake neighborhood',
    city: faker.address.cityName(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode('########')
  }
})
