import { AuthModel } from '../models/AuthModel'
import { loginSchema, tokenSchema } from '../validations/auth'
import { Request } from 'express'

export class AuthService {
  constructor (private readonly authModel: AuthModel) {}

  login = (req: Request): string | undefined => {
    const { login, password } = loginSchema.parse(req.body)

    return this.authModel.login(login, password)
  }

  validateToken = (req: Request) => {
    const { jwtToken } = tokenSchema.parse(req.body)

    return this.authModel.validateToken(jwtToken)
  }
}
