import pool from '../db/pg.js'

async function getAllHistories(req, res) {
  try {
    const allHistories = await pool.query(
      'SELECT * FROM history ORDER BY history_id ASC',
    )
    console.log(allHistories.rows)
    return res.status(200).json(allHistories.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function getAllHistoriesByLearner(req, res) {
  try {
    const { learner_id } = req.params
    const allHistories = await pool.query(
      'SELECT * FROM history WHERE learner_id = $1 ORDER BY history_id ASC',
      [learner_id],
    )
    console.log(allHistories.rows)
    return res.status(200).json(allHistories.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function getAllHistoriesByVideoOfLearner(req, res) {
  try {
    const { learner_id, video_id } = req.params
    const allHistories = await pool.query(
      'SELECT * FROM history WHERE learner_id = $1 AND video_id = $2 ORDER BY history_id ASC',
      [learner_id, video_id],
    )
    console.log(allHistories.rows)
    return res.status(200).json(allHistories.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function deleteHistory(req, res) {
  try {
    const { id } = req.params
    const history = await pool.query(
      'DELETE FROM history WHERE history_id = $1 RETURNING *',
      [id],
    )
    // Check if history exists
    if (!history.rows.length) {
      return res.status(404).json({ message: 'History not found' })
    }
    return res
      .status(200)
      .json({ message: 'History was deleted!', data: history.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function createHistory(req, res) {
  try {
    const { learner_id, video_id, track_id, completed } = req.body
    const history = await pool.query(
      'INSERT INTO history (learner_id, video_id, track_id, completed) VALUES ($1, $2, $3, $4) RETURNING *',
      [learner_id, video_id, track_id, completed],
    )
    return res
      .status(200)
      .json({ message: 'History was created!', data: history.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

export default {
  getAllHistories,
  getAllHistoriesByLearner,
  getAllHistoriesByVideoOfLearner,
  deleteHistory,
  createHistory,
}
