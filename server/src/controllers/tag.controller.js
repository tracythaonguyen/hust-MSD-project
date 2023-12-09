import pool from '../config/db.js'

async function getAllTags(req, res) {
  try {
    const allTags = await pool.query('SELECT * FROM tag ORDER BY tag_id ASC')
    console.log(allTags.rows)
    return res.status(200).json(allTags.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function deleteTag(req, res) {
  try {
    const { id } = req.params
    const tag = await pool.query(
      'DELETE FROM tag WHERE tag_id = $1 RETURNING *',
      [id],
    )
    // Check if tag exists
    if (!tag.rows.length) {
      return res.status(404).json({ message: 'Tag not found' })
    }
    return res
      .status(200)
      .json({ message: 'Tag was deleted!', data: tag.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function updateTag(req, res) {
  try {
    const { name } = req.body
    const { id } = req.params

    if (!name) {
      return res.status(400).json({ message: 'Name is required' })
    }

    const tag = await pool.query(
      'UPDATE tag SET tag_name = $1 WHERE tag_id = $2 RETURNING *',
      [name, id],
    )
    // Check if tag exists
    if (!tag.rows.length) {
      return res.status(404).json({ message: 'Tag not found' })
    }
    // Update tag if it exists
    return res
      .status(200)
      .json({ message: 'Tag was updated!', data: tag.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function createTag(req, res) {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ message: 'Name is required' })
    }

    const tag = await pool.query(
      'INSERT INTO tag (tag_name) VALUES ($1) RETURNING *',
      [name],
    )
    return res
      .status(200)
      .json({ message: 'Tag was created!', data: tag.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function searchTagByName(req, res) {
  try {
    const { name } = req.query
    let queryText = `SELECT * FROM tag`

    const queryParams = []

    if (name) {
      queryText += ' WHERE'
      queryText += ` REPLACE(tag_name, ' ', '') ILIKE $1`
      queryParams.push(`%${name}%`)
    }

    queryText += ' ORDER BY tag_id ASC'

    const tag = await pool.query(queryText, queryParams)

    if (tag.rows.length === 0) {
      return res.status(404).json({ message: 'Tag not found' })
    }

    return res.status(200).json(tag.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function getTagById(req, res) {
  try {
    const { id } = req.params
    const tag = await pool.query('SELECT * FROM tag WHERE tag_id = $1', [id])
    if (!tag.rows.length) {
      return res.status(500).json({ message: 'Tag not found' })
    }
    return res.status(200).json({ message: 'success', data: tag.rows[0] })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: error.message,
    })
  }
}

export default {
  getAllTags,
  deleteTag,
  updateTag,
  createTag,
  searchTagByName,
  getTagById,
}
