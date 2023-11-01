const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all videos
router.get('/videos', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM video');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET a single video by id
router.get('/video/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM video WHERE video_id = $1', [id]);
    if (rows.length === 0) return res.status(404).send('Video not found');
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
