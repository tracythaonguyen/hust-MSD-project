import pool from '../config/db.js'

async function getAllTracks(req, res) {
  try {
    const { video_id } = req.params
    const allTracks = await pool.query(
      'SELECT * FROM track ORDER BY video_id, track_id ASC',
    )
    return res.status(200).json(allTracks.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function getAllTracksOfVideo(req, res) {
  try {
    const { video_id } = req.params
    const allTracks = await pool.query(
      'SELECT * FROM track WHERE video_id = $1 ORDER BY track_id ASC',
      [video_id],
    )
    return res.status(200).json(allTracks.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function deleteTrackOfVideo(req, res) {
  try {
    const { video_id, track_id } = req.params
    const track = await pool.query(
      'DELETE FROM track WHERE track_id = $1 AND video_id = $2 RETURNING *',
      [track_id, video_id],
    )
    // Check if track exists
    if (!track.rows.length) {
      return res.status(404).json({ message: 'Track not found' })
    }
    return res
      .status(200)
      .json({ message: 'Track was deleted!', data: track.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function createTrack(req, res) {
  try {
    const { track_id, video_id, start_time, end_time, transcript } = req.body
    if (!track_id) {
      return res.status(400).json({ message: 'Track id is required' })
    }
    if (!video_id) {
      return res.status(400).json({ message: 'Video id is required' })
    }
    if (!start_time) {
      return res.status(400).json({ message: 'Start time is required' })
    }
    if (!end_time) {
      return res.status(400).json({ message: 'End time is required' })
    }
    if (!transcript) {
      return res.status(400).json({ message: 'Transcript is required' })
    }
    const track = await pool.query(
      'INSERT INTO track (track_id, video_id, start_time, end_time, transcript) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [track_id, video_id, start_time, end_time, transcript],
    )
    return res
      .status(200)
      .json({ message: 'Track was created!', data: track.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function updateTrackTimeOfVideo(req, res) {
  try {
    const { start_time, end_time, transcript } = req.body
    const { video_id, track_id } = req.params

    const track = await pool.query(
      'UPDATE track SET start_time = $1, end_time = $2, transcript = $3 WHERE video_id = $4 AND track_id = $5 RETURNING *',
      [start_time, end_time, transcript, video_id, track_id],
    )
    // Check if track exists
    if (!track.rows.length) {
      return res.status(404).json({ message: 'Track not found' })
    }
    // Update track if it exists
    return res
      .status(200)
      .json({ message: 'Track was updated!', data: track.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

export default {
  getAllTracks,
  getAllTracksOfVideo,
  deleteTrackOfVideo,
  createTrack,
  updateTrackTimeOfVideo,
}
