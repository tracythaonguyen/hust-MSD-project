import pool from '../config/db.js'

async function getAllProgress(req, res) {
  try {
    const allProgress = await pool.query(
      'SELECT * FROM progress ORDER BY learner_id, video_id ASC',
    )
    console.log(allProgress.rows)
    return res.status(200).json(allProgress.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function getAllProgressOfLearner(req, res) {
  try {
    const { learner_id } = req.params
    const allProgress = await pool.query(
      'SELECT * FROM progress WHERE learner_id = $1 ORDER BY learner_id, video_id ASC',
      [learner_id],
    )
    console.log(allProgress.rows)
    return res.status(200).json(allProgress.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function deleteProgress(req, res) {
  try {
    const { id } = req.params
    const progress = await pool.query(
      'DELETE FROM progress WHERE progress_id = $1 RETURNING *',
      [id],
    )
    // Check if progress exists
    if (!progress.rows.length) {
      return res.status(404).json({ message: 'Progress not found' })
    }
    return res
      .status(200)
      .json({ message: 'Progress was deleted!', data: progress.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function createProgress(req, res) {
  try {
    const { learner_id, video_id, highest_score } = req.body
    if (!learner_id) {
      return res.status(400).json({ message: 'Learner id is required' })
    }
    if (!video_id) {
      return res.status(400).json({ message: 'Video id is required' })
    }
    if (!highest_score) {
      return res.status(400).json({ message: 'Highest score is required' })
    }

    const progress = await pool.query(
      'INSERT INTO progress (learner_id, video_id, highest_score) VALUES ($1, $2, $3) RETURNING *',
      [learner_id, video_id, highest_score],
    )
    return res
      .status(200)
      .json({ message: 'Progress was created!', data: progress.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

export default {
  getAllProgress,
  getAllProgressOfLearner,
  deleteProgress,
  createProgress,
}
