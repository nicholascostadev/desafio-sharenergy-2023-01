import { Request, Response, NextFunction } from 'express'

export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.PROD === 'true' ? process.env.FRONTEND_URL as string : 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  next()
}
