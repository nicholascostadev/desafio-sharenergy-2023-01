import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './routes'
import { corsMiddleware } from './middlewares/corsMiddleware'
dotenv.config()

export const app = express()
app.use(cors({
  origin: process.env.PROD === 'true' ? process.env.FRONTEND_URL as string : 'http://localhost:5173',
  credentials: true
}))
app.use(corsMiddleware)
app.use(cookieParser())
app.use(express.json())

app.use('/', router)
