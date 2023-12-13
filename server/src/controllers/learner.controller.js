import pool from '../config/db.js'

async function getAllLearners(req, res) {
  try {
    const allLearners = await pool.query(
      'SELECT * FROM learner ORDER BY learner_id ASC',
    )
    console.log(allLearners.rows)
    return res.status(200).json(allLearners.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function deleteLearner(req, res) {
  try {
    const { id } = req.params
    const learner = await pool.query(
      'DELETE FROM learner WHERE learner_id = $1 RETURNING *',
      [id],
    )
    // Check if learner exists
    if (!learner.rows.length) {
      return res.status(404).json({ message: 'Learner not found' })
    }
    return res
      .status(200)
      .json({ message: 'Learner was deleted!', data: learner.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function createLearner(req, res) {
  try {
    const { age, occupation, account_id } = req.body
    if (!account_id) {
      return res.status(400).json({ message: 'Account id is required' })
    }
    const learner = await pool.query(
      'INSERT INTO learner (age, occupation, account_id) VALUES ($1, $2, $3) RETURNING *',
      [age, occupation, account_id],
    )
    return res
      .status(200)
      .json({ message: 'Learner was created!', data: learner.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

export default {
  getAllLearners,
  deleteLearner,
  createLearner,
}
