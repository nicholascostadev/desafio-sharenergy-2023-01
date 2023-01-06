import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { parseAuthorization } from '../utils/parseAuthorization'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = parseAuthorization(req.header('Authorization'))

  if (token == null) {
    return res.status(401).json({
      message: 'Error',
      error: 'Unauthorized - No token received'
    })
  }

  try {
    jwt.verify(token, process.env.AUTH_SECRET as string)

    next()
  } catch (err) {
    res.clearCookie('shark-session', { path: '/' })
    return res.status(401).json({
      message: 'Error',
      error: 'Unauthorized - Invalid token'
    })
  }
}
