import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const PORT = 4444
const app = express()

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
