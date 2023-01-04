import jwt from 'jsonwebtoken'
import { LoginInfo } from '../@types/auth'

export class AuthService {
  static login = (loginInfo: LoginInfo): string | undefined => {
    const { login, password } = loginInfo

    // hardcoded for now
    if (login === 'desafiosharenergy' && password === 'sh@r3n3rgy') {
      const token = jwt.sign({ username: login }, process.env.AUTH_SECRET as string, { expiresIn: '1d' })

      return token
    }

    throw new Error('Wrong email or password')
  }

  static validateToken = (jwtToken: string) => {
    if (jwtToken == null) {
      throw new Error('Unauthorized - No token received')
    }

    try {
      return jwt.verify(jwtToken, process.env.AUTH_SECRET as string)
    } catch (err) {
      throw new Error('Unauthorized - Invalid token')
    }
  }
}
