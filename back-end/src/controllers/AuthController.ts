import { RequestHandler } from 'express'
import { validateLoginInfo } from '../@types/auth'
import { AuthService } from '../services/AuthService'

export class AuthController {
  static login: RequestHandler = (req, res) => {
    try {
      const loginInfo = validateLoginInfo(req.body)
      const token = AuthService.login(loginInfo)

      return res.status(200).cookie('shark-session', token, { expires: new Date(Date.now() + 900000), path: '/' }).json({
        status: 'Success'
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: 'Error',
          data: error.message
        })
      }

      return res.status(400).json({
        message: 'Error',
        data: error
      })
    }
  }
}
