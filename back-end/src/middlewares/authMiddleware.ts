import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['shark-session']

  if (token == null) {
    return res.status(401).json({
      message: 'Error',
      error: 'Unauthorized'
    })
  }

  try {
    jwt.verify(token, process.env.AUTH_SECRET as string)
  } catch (err) {
    return res.status(401).json({
      message: 'Error',
      error: 'Unauthorized - Invalid token'
    })
  }

  next()
}
