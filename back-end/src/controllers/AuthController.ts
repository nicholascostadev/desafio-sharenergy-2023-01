import { RequestHandler } from 'express'
import { AuthService } from '../services/AuthService'
import { ZodError } from 'zod'
import { loginSchema } from '../validations/auth'

export class AuthController {
  static login: RequestHandler = (req, res) => {
    try {
      const loginInfo = loginSchema.parse(req.body)
      const token = AuthService.login(loginInfo)

      return res.status(200).cookie('shark-session', token,
        {
          expires: new Date(Date.now() + 900000),
          path: '/'
        }
      ).json({
        status: 'Success'
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
