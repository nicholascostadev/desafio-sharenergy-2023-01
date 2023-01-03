import jwt from 'jsonwebtoken'
import { LoginInfo } from '../@types/auth'

export class AuthService {
  static login = (loginInfo: LoginInfo): string | undefined => {
    const { login, password } = loginInfo

    // hardcoded for now
    if (login === 'desafiosharenergy' && password === 'sh@r3n3rgy') {
      const token = jwt.sign({ login }, process.env.AUTH_SECRET ?? '', { expiresIn: '1d' })

      return token
    }

    throw new Error('Wrong email or password')
  }
}
