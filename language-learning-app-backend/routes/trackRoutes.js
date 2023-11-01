const express = require('express');
const router = express.Router();
const db = require('../db');

// GET tracks based on videoId
router.get('/tracks/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const { rows } = await db.query('SELECT * FROM track WHERE video_id = $1', [videoId]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
