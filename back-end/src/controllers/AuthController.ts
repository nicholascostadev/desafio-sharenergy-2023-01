import { RequestHandler } from 'express'
import { AuthService } from '../services/AuthService'
import { ZodError } from 'zod'
import { AuthModelStatic } from '../models/AuthModelStatic'

const model = new AuthModelStatic()
const authService = new AuthService(model)

export class AuthController {
  login: RequestHandler = (req, res) => {
    try {
      const token = authService.login(req)

      return res.status(200).json({
        message: 'Success',
        token
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation Error',
          data: error.issues.map(issue => issue.message)
        })
      }

      if (error instanceof Error) {
        return res.status(401).json({
          message: 'Error',
          data: error.message
        })
      }

      return res.status(401).json({
        message: 'Error',
        data: error
      })
    }
  }

  validateToken: RequestHandler = (req, res) => {
    try {
      const token = authService.validateToken(req)

      return res.status(200).json({
        message: 'Success',
        data: token
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({
          message: 'Error',
          data: error.message
        })
      }

      return res.status(401).json({
        message: 'Error',
        data: error
      })
    }
  }
}
