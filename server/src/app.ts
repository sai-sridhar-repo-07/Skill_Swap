import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { connectMongo } from './db/mongo'
import { connectPostgres } from './db/postgres'

const app = express()

// Connect databases
connectMongo()
connectPostgres()

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})


dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app
