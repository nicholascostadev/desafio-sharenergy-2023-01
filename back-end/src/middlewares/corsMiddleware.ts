import { Request, Response, NextFunction } from 'express'

export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header({
    'Access-Control-Allow-Origin': process.env.PROD === 'true' ? process.env.FRONTEND_URL as string : 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': 'true'
  })

  next()
}
