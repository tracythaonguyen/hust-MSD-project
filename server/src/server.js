import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'

import pool from '../config/db.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 6969

async function getAllTests(req, res) {
  try {
    const allTests = await pool.query('SELECT * FROM test')
    return res.status(200).json(allTests.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

const router = express.Router()
router.get('/', getAllTests)
app.use('/test', router)

app.listen(port, () => {
  console.log('Backend is running on the port: ' + port)
})

export default app
