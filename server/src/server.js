import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'

import testRouter from './routes/test.router.js'
import categoryRouter from './routes/category.router.js'
import tagRouter from './routes/tag.router.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 6969

app.use('/test', testRouter)
app.use('/category', categoryRouter)
app.use('/tag', tagRouter)

app.listen(port, () => {
  console.log('Backend is running on the port: ' + port)
})

export default app
