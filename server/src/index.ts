import express from 'express'
import { connectMongo } from './db/mongo'
import { connectPostgres } from './db/postgres'

const app = express()

// Connect databases
connectMongo()
connectPostgres()

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
