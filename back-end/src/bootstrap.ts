import express from 'express'
import cookieParser from 'cookie-parser'
import { authRoutes } from './routes/authRoutes'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const PORT = 4444
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
