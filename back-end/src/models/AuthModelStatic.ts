import { AuthModel } from './AuthModel'
import jwt, { JwtPayload } from 'jsonwebtoken'

export class AuthModelStatic implements AuthModel {
  login = (login: string, password: string): string => {
    if (login === 'desafiosharenergy' && password === 'sh@r3n3rgy') {
      const token = jwt.sign({ username: login }, process.env.AUTH_SECRET as string, { expiresIn: '1d' })

      return token
    }

    throw new Error('Wrong email or password')
  }

  validateToken = (jwtToken: string): string | JwtPayload => {
    try {
      return jwt.verify(jwtToken, process.env.AUTH_SECRET as string)
    } catch (err) {
      throw new Error('Unauthorized - Invalid token')
    }
  }
}
