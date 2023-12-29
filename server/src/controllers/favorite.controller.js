import pool from '../config/db.js'

async function getAllFavorite(req, res) {
  try {
    const allFavorite = await pool.query(
      'SELECT * FROM favorite ORDER BY favorite_id ASC',
    )
    console.log(allFavorite.rows)
    return res.status(200).json(allFavorite.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function getAllFavoriteByLearner(req, res) {
  try {
    const { learner_id } = req.params
    const allFavorite = await pool.query(
      'SELECT * FROM favorite WHERE learner_id = $1 ORDER BY favorite_id ASC',
      [learner_id],
    )
    console.log(allFavorite.rows)
    return res.status(200).json(allFavorite.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function getAllFavoriteByVideo(req, res) {
  try {
    const { video_id } = req.params
    const allFavorite = await pool.query(
      'SELECT * FROM favorite WHERE video_id = $1 ORDER BY favorite_id ASC',
      [video_id],
    )
    console.log(allFavorite.rows)
    return res.status(200).json(allFavorite.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function deleteFavorite(req, res) {
  try {
    const { id } = req.params
    const favorite = await pool.query(
      'DELETE FROM favorite WHERE favorite_id = $1 RETURNING *',
      [id],
    )
    // Check if favorite exists
    if (!favorite.rows.length) {
      return res.status(404).json({ message: 'Favorite not found' })
    }
    return res
      .status(200)
      .json({ message: 'Favorite was deleted!', data: favorite.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function createFavorite(req, res) {
  try {
    const { learner_id, video_id } = req.body
    if (!learner_id) {
      return res.status(400).json({ message: 'Learner id is required' })
    }
    if (!video_id) {
      return res.status(400).json({ message: 'Video id is required' })
    }
    const favorite = await pool.query(
      'INSERT INTO favorite (learner_id, video_id) VALUES ($1, $2) RETURNING *',
      [learner_id, video_id],
    )
    return res
      .status(200)
      .json({ message: 'Favorite was created!', data: favorite.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

export default {
  getAllFavorite,
  getAllFavoriteByVideo,
  getAllFavoriteByLearner,
  deleteFavorite,
  createFavorite,
}
