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

      res.cookie('sharenergy-session', token, {
        expires: persist ? new Date(Date.now() + 86400000) : undefined // 24 hours or only until browser is closed
      })

      return res.status(200)
        .setHeader('Access-Control-Allow-Credentials', 'true')
        .setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
        .json({
          message: 'Success'
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

  static validateToken: RequestHandler = (req, res) => {
    try {
      const { jwtToken } = req.body
      const token = AuthService.validateToken(jwtToken)

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
