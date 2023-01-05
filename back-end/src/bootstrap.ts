import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './routes'
dotenv.config()

const PORT = process.env.PORT ?? 4444
const app = express()
app.use(cors({
  origin: ['http://localhost:5173', process.env.FRONTEND_URL as string],
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())

app.use('/', router)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
