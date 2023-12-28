import pool from '../config/db.js'

async function getAllFeeds(req, res) {
  try {
    const allFeeds = await pool.query(
      'SELECT * FROM feedback ORDER BY feedback_id ASC',
    )
    console.log(allFeeds.rows)
    return res.status(200).json(allFeeds.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function getAllFeedsByVideo(req, res) {
  try {
    const { video_id } = req.params
    const allFeeds = await pool.query(
      'SELECT * FROM feedback WHERE video_id = $1 ORDER BY feedback_id ASC',
      [video_id],
    )
    // Check if feed exists
    if (!feed.rows.length) {
      return res.status(404).json({ message: 'Feed in video not found' })
    }
    return res
      .status(200)
      .json({ message: 'Feedback in video', data: allFeeds.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function deleteFeed(req, res) {
  try {
    const { id } = req.params
    const feed = await pool.query(
      'DELETE FROM feedback WHERE feedback_id = $1 RETURNING *',
      [id],
    )
    // Check if feed exists
    if (!feed.rows.length) {
      return res.status(404).json({ message: 'Feed not found' })
    }
    return res
      .status(200)
      .json({ message: 'Feedback was deleted!', data: feed.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function updateFeedContent(req, res) {
  try {
    const { content } = req.body
    const { id } = req.params

    if (!content) {
      return res.status(400).json({ message: 'Content is required' })
    }

    const feed = await pool.query(
      'UPDATE feedback SET content = $1 WHERE feedback_id = $2 RETURNING *',
      [content, id],
    )

    // Check if feed exists
    if (!feed.rows.length) {
      return res.status(404).json({ message: 'Feed not found' })
    }
    // Update feed if it exists
    return res
      .status(200)
      .json({ message: 'Feedback was updated!', data: feed.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function createFeed(req, res) {
  try {
    const { learner_id, video_id, content } = req.body
    if (!learner_id) {
      return res.status(400).json({ message: 'Learner id is required' })
    }
    if (!video_id) {
      return res.status(400).json({ message: 'Video id is required' })
    }
    if (!content) {
      return res.status(400).json({ message: 'Content is required' })
    }

    const feed = await pool.query(
      'INSERT INTO feedback (learner_id, video_id, content) VALUES ($1, $2, $3) RETURNING *',
      [learner_id, video_id, content],
    )
    return res
      .status(200)
      .json({ message: 'Feedback was created!', data: feed.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

export default {
  getAllFeeds,
  deleteFeed,
  updateFeedContent,
  createFeed,
  getAllFeedsByVideo,
}
