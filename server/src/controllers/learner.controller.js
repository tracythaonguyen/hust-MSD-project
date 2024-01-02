import pool from '../config/db.js'
import jwt from 'jsonwebtoken'
const { sign, verify } = jwt

async function getAllLearners(req, res) {
  try {
    const allLearners = await pool.query(
      'SELECT * FROM learner natural join account ORDER BY learner_id ASC',
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
    const { dob, occupation, account_id, total_score } = req.body
    if (!account_id) {
      return res.status(400).json({ message: 'Account id is required' })
    }
    const learner = await pool.query(
      'INSERT INTO learner (dob, occupation, account_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [dob, occupation, account_id, total_score],
    )
    return res
      .status(200)
      .json({ message: 'Learner was created!', data: learner.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function updateLearner(req, res) {
  try {
    const { dob, occupation, account_id , address, phone_number} = req.body
    const { id } = req.params

    if (!account_id) {
      return res.status(400).json({ message: 'Account id is required' })
    }

    const learner = await pool.query(
      `UPDATE learner SET 
      dob = $1, occupation = $2, 
      account_id = $3, 
      address = $4,
      phone_number = $5
      WHERE learner_id = $6 RETURNING *`,
      [dob, occupation, account_id, address, phone_number, id],
    )
    // Check if learner exists
    if (!learner.rows.length) {
      return res.status(404).json({ message: 'Learner not found' })
    }
    // Update learner if it exists
    return res
      .status(200)
      .json({ message: 'Learner was updated!', data: learner.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function updateLearnerScore(req, res) {
  try {
    const { total_score } = req.body
    const { id } = req.params

    if (!account_id) {
      return res.status(400).json({ message: 'Account id is required' })
    }

    const learner = await pool.query(
      'UPDATE learner SET total_score = $1 WHERE learner_id = $2 RETURNING *',
      [total_score, id],
    )
    // Check if learner exists
    if (!learner.rows.length) {
      return res.status(404).json({ message: 'Learner not found' })
    }
    // Update learner if it exists
    return res
      .status(200)
      .json({ message: 'Learner score was updated!', data: learner.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function getLearnerById(req, res) {
  try {
    const { id } = req.params
    const learner = await pool.query(
      'SELECT * FROM learner WHERE learner_id = $1',
      [id],
    )
    // Check if learner exists
    if (!learner.rows.length) {
      return res.status(404).json({ message: 'Learner not found' })
    }
    // Get learner if it exists
    return res
      .status(200)
      .json({ message: 'Learner was found!', data: learner.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}
async function getLearnerByToken(req, res) {
  try {
    const { token } = req.params
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET)
    const account_id = decoded.account_id
    const account = await pool.query(
      'SELECT * FROM learner WHERE account_id = $1',
      [account_id],
    )
    return res.status(200).json(account.rows[0])
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getAllLearners,
  deleteLearner,
  createLearner,
  updateLearner,
  getLearnerById,
  getLearnerByToken,
  updateLearnerScore,
}
