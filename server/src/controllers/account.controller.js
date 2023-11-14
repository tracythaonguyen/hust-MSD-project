import pool from '../config/db.js'

async function getAllAccounts(req, res) {
  try {
    const allAccounts = await pool.query(
      'SELECT * FROM account ORDER BY account_id ASC',
    )
    console.log(allAccounts.rows)
    return res.status(200).json(allAccounts.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ message: error.message })
  }
}

async function deleteAccount(req, res) {
  try {
    const { id } = req.params
    const account = await pool.query(
      'DELETE FROM account WHERE account_id = $1 RETURNING *',
      [id],
    )
    // Check if account exists
    if (!account.rows.length) {
      return res.status(404).json({ message: 'Account not found' })
    }
    return res
      .status(200)
      .json({ message: 'Account was deleted!', data: account.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function updateUserName(req, res) {
  try {
    const { username } = req.body

    const { id } = req.params

    if (!username) {
      return res.status(400).json({ message: 'User name is required' })
    }

    const account = await pool.query(
      'UPDATE account SET username = $1 WHERE account_id = $2 RETURNING *',
      [username, id],
    )
    // Check if account exists
    if (!account.rows.length) {
      return res.status(404).json({ message: 'Account not found' })
    }
    // Update account if it exists
    return res
      .status(200)
      .json({ message: 'Account was updated!', data: account.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function createAccount(req, res) {
  try {
    const {
      username,
      password,
      email,
      user_role,
      first_name,
      last_name,
    } = req.body

    if (!username) {
      return res.status(400).json({ message: 'User name is required' })
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required' })
    }

    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    if (!user_role) {
      return res.status(400).json({ message: 'User role is required' })
    }

    if (!first_name) {
      return res.status(400).json({ message: 'First name is required' })
    }

    const account = await pool.query(
      'INSERT INTO account (username, password, email, user_role, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, password, email, user_role, first_name, last_name],
    )
    return res
      .status(200)
      .json({ message: 'Account was created!', data: account.rows[0] })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

async function searchAccountByUserName(req, res) {
  try {
    const { username } = req.query
    let queryText = `SELECT * FROM account`

    const queryParams = []

    if (username) {
      queryText += ' WHERE'
      queryText += ` REPLACE(username, ' ', '') ILIKE $1`
      queryParams.push(`%${username}%`)
    }

    queryText += ' ORDER BY account_id ASC'

    const account = await pool.query(queryText, queryParams)

    if (account.rows.length === 0) {
      return res.status(404).json({ message: 'Account not found' })
    }

    return res.status(200).json(account.rows)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getAllAccounts,
  deleteAccount,
  updateUserName,
  createAccount,
  searchAccountByUserName,
}
