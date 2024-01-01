import pool from '../config/db.js'

async function getAllVideos(req, res) {
  try {
    const allVideos = await pool.query(
      'SELECT * FROM video ORDER BY video_id ASC',
    )
    console.log(allVideos.rows)
    return res.status(200).json(allVideos.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function deleteVideo(req, res) {
  try {
    const { id } = req.params
    const video = await pool.query(
      'DELETE FROM video WHERE video_id = $1 RETURNING *',
      [id],
    )
    // Check if video exists
    if (!video.rows.length) {
      return res.status(404).json({ message: 'Video not found' })
    }
    return res
      .status(200)
      .json({ message: 'Video was deleted!', data: video.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function updateVideoTitle(req, res) {
  try {
    const { title } = req.body
    const { id } = req.params

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const video = await pool.query(
      'UPDATE video SET video_title = $1 WHERE video_id = $2 RETURNING *',
      [title, id],
    )
    // Check if video exists
    if (!video.rows.length) {
      return res.status(404).json({ message: 'Video not found' })
    }
    // Update video if it exists
    return res
      .status(200)
      .json({ message: 'Video was updated!', data: video.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function createVideoWithCategoryandTag(req, res) {
  try {
    const {
      title,
      level,
      source_link,
      link_img,
      description,
      category_id,
      tags,
    } = req.body
    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }
    if (!level) {
      return res.status(400).json({ message: 'Level is required' })
    }
    if (!source_link) {
      return res.status(400).json({ message: 'Source link is required' })
    }
    if (!category_id) {
      return res.status(400).json({ message: 'Category is required' })
    }
    const video = await pool.query(
      'INSERT INTO video (video_title, level, source_link, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, level, source_link, category_id],
    )
    const videoId = video.rows[0].video_id
    if (tags) {
      const values = tags.map((tag) => `(${videoId}, ${tag})`).join(', ')
      const query = `INSERT INTO tag_to_video (video_id, tag_id) VALUES ${values} RETURNING *;`
      const videoTags = await pool.query(query)
    }
    return res
      .status(200)
      .json({ message: 'Video was created!', data: video.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function searchVideoByTitle(req, res) {
  try {
    const { name } = req.query
    let queryText = `SELECT * FROM video`

    const queryParams = []

    if (name) {
      queryText += ' WHERE'
      queryText += ` REPLACE(video_title, ' ', '') ILIKE $1`
      queryParams.push(`%${name}%`)
    }

    queryText += ' ORDER BY video_id ASC'

    const video = await pool.query(queryText, queryParams)

    if (video.rows.length === 0) {
      return res.status(404).json({ message: 'Video not found' })
    }

    return res.status(200).json(video.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function getVideoById(req, res) {
  try {
    const { id } = req.params
    const video = await pool.query('SELECT * FROM video WHERE video_id = $1', [
      id,
    ])
    if (!video.rows.length) {
      return res.status(500).json({ message: 'Video not found' })
    }
    return res.status(200).json({ message: 'success', data: video.rows[0] })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: error.message,
    })
  }
}

async function getAllTagsOfVideo(req, res) {
  try {
    const { id } = req.params
    const tags = await pool.query(
      'SELECT t.tag_id, t.tag_name FROM tag_to_video v JOIN tag t ON t.tag_id = v.tag_id WHERE video_id = $1',
      [id],
    )

    return res.status(200).json(tags.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

//function get rencent learning video based on learner id
async function getRecentLearningVideo(req, res) {
  try {
    const { id } = req.params
    console.log('z', id)
    const recentVideo = await pool.query(
      `SELECT video_id, video_title, level, description, link_img, category_name, max(click_time) AS click_time
      FROM
        video NATURAL JOIN progress NATURAL JOIN category
      WHERE learner_id = $1 GROUP BY video_id, video_title, level, description, link_img, category_name 
      ORDER BY click_time DESC ;`,
      [id],
    )
    return res.status(200).json(recentVideo.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Internal server error22' })
  }
}

async function getFavouriteVideo(req, res) {
  try {
    const { id } = req.params
    console.log('z', id)
    const favouriteVideo = await pool.query(
      `SELECT v.video_id, v.video_title, v.level, v.description, v.link_img, c.category_name, v.view, v.upload_date
      FROM favorite f
      JOIN video v ON f.video_id = v.video_id
      JOIN category c ON v.category_id = c.category_id
      WHERE f.learner_id = $1`,
      [id]
    )
    return res.status(200).json(favouriteVideo.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// get all videos by tag id
async function getAllVideosByTagId(req, res) {
  try {
    const { id } = req.params
    const videos = await pool.query(
      `SELECT * FROM video WHERE video_id IN (SELECT video_id FROM tag_to_video WHERE tag_id = $1)`,
      [id],
    )
    return res.status(200).json(videos.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function handleVideoView(req, res) {
  try {
    const { id } = req.params; 
    const { learnerId } = req.body;

    await pool.query('BEGIN');

    await pool.query('SELECT * FROM add_history($1, $2)', [id, learnerId]);
    await pool.query('SELECT update_click_time($1, $2)', [learnerId, id]);

    await pool.query('COMMIT');

    res.status(200).json({ message: 'View recorded successfully'});
  } catch (error) {
    console.error(error.message);
    await pool.query('ROLLBACK');

    res.status(500).json({ message: 'An error occurred' });
  }
}


export default {
  getAllVideos,
  deleteVideo,
  updateVideoTitle,
  searchVideoByTitle,
  getVideoById,
  createVideoWithCategoryandTag,
  getAllTagsOfVideo,
  getRecentLearningVideo,
  getAllVideosByTagId,
  getFavouriteVideo,
  handleVideoView,
}
