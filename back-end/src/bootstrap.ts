import express from 'express'

const PORT = 4444
const app = express()

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
