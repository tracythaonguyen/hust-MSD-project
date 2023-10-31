import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import testRouter from './routes/test.router.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 6969

app.use('/test', testRouter)

app.listen(port, () => {
  console.log('Backend is running on the port: ' + port)
})

export default app
