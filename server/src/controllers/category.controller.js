import pool from '../config/db.js'

async function getAllCategories(req, res) {
  try {
    const allCategories = await pool.query(
      'SELECT * FROM category ORDER BY category_id ASC',
    )
    console.log(allCategories.rows)
    return res.status(200).json(allCategories.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params
    const category = await pool.query(
      'DELETE FROM category WHERE category_id = $1 RETURNING *',
      [id],
    )
    // Check if category exists
    if (!category.rows.length) {
      return res.status(404).json({ message: 'Category not found' })
    }
    return res
      .status(200)
      .json({ message: 'Category was deleted!', data: category.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function updateCategory(req, res) {
  try {
    const { name } = req.body
    const { id } = req.params

    if (!name) {
      return res.status(400).json({ message: 'Name is required' })
    }

    const category = await pool.query(
      'UPDATE category SET category_name = $1 WHERE category_id = $2 RETURNING *',
      [name, id],
    )
    // Check if category exists
    if (!category.rows.length) {
      return res.status(404).json({ message: 'Category not found' })
    }
    // Update category if it exists
    return res
      .status(200)
      .json({ message: 'Category was updated!', data: category.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function createCategory(req, res) {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ message: 'Name is required' })
    }

    const category = await pool.query(
      'INSERT INTO category (category_name) VALUES ($1) RETURNING *',
      [name],
    )
    return res
      .status(200)
      .json({ message: 'Category was created!', data: category.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function searchCategoryByName(req, res) {
  try {
    const { name } = req.query
    let queryText = `SELECT * FROM category`

    const queryParams = []

    if (name) {
      queryText += ' WHERE'
      queryText += ` REPLACE(category_name, ' ', '') ILIKE $1`
      queryParams.push(`%${name}%`)
    }

    queryText += ' ORDER BY category_id ASC'

    const category = await pool.query(queryText, queryParams)

    if (category.rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' })
    }

    return res.status(200).json(category.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function getCategoryById(req, res) {
  try {
    const { id } = req.params
    const category = await pool.query(
      'SELECT * FROM category WHERE category_id = $1',
      [id],
    )
    if (!category.rows.length) {
      return res.status(500).json({ message: 'Category not found' })
    }
    return res.status(200).json({ message: 'success', data: category.rows[0] })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: error.message,
    })
  }
}

export default {
  getAllCategories,
  deleteCategory,
  updateCategory,
  createCategory,
  searchCategoryByName,
  getCategoryById,
}
