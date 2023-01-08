import { JwtPayload } from 'jsonwebtoken'

export interface AuthModel {
  login: (login: string, password: string) => string
  validateToken: (token: string) => string | JwtPayload
}
