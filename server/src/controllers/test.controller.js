import pool from '../config/db.js'

async function getAllTests(req, res) {
  try {
    const allTests = await pool.query('SELECT * FROM test')
    return res.status(200).json(allTests.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

export default {
  getAllTests,
}
