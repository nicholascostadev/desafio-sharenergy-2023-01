export type User = {
  id: string
  email: string

  picture: {
    medium: string
  }

  name: {
    first: string
    last: string
  }

  login: {
    username: string
  }

  dob: {
    age: number
  }
}
