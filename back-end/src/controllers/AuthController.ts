import { RequestHandler } from 'express'
import { AuthService } from '../services/AuthService'
import { ZodError } from 'zod'
import { loginSchema, querySchema } from '../validations/auth'

export class AuthController {
  static login: RequestHandler = (req, res) => {
    try {
      const { login, password } = loginSchema.parse(req.body)
      const { persist } = querySchema.parse(req.query)
      const token = AuthService.login({ login, password })

      if (persist) {
        return res.status(200).cookie('shark-session', token,
          {
            expires: new Date(Date.now() + 900000),
            path: '/'
          }
        ).json({
          message: 'Success'
        })
      }

      return res.status(200).json({
        message: 'Success',
        data: token
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation Error',
          data: error.issues.map(issue => issue.message)
        })
      }

      return res.status(400).json({
        message: 'Error',
        data: error
      })
    }
  }
}
