import pool from "../config/db.js";

async function getAllHistories(req, res) {
  try {
    const allHistories = await pool.query(
      "SELECT * FROM history ORDER BY history_id ASC"
    );
    console.log(allHistories.rows);
    return res.status(200).json(allHistories.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }
}

async function getAllHistoriesByLearner(req, res) {
  try {
    const { learner_id } = req.params;
    const allHistories = await pool.query(
      "SELECT * FROM history WHERE learner_id = $1 ORDER BY history_id ASC",
      [learner_id]
    );
    console.log(allHistories.rows);
    return res.status(200).json(allHistories.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }
}

async function getAllHistoriesByVideoOfLearner(req, res) {
  try {
    const { learner_id, video_id } = req.params;
    const allHistories = await pool.query(
      "SELECT * FROM history WHERE learner_id = $1 AND video_id = $2 ORDER BY history_id ASC",
      [learner_id, video_id]
    );
    console.log(allHistories.rows);
    return res.status(200).json(allHistories.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }
}

async function deleteHistory(req, res) {
  try {
    const { id } = req.params;
    const history = await pool.query(
      "DELETE FROM history WHERE history_id = $1 RETURNING *",
      [id]
    );
    // Check if history exists
    if (!history.rows.length) {
      return res.status(404).json({ message: "History not found" });
    }
    return res
      .status(200)
      .json({ message: "History was deleted!", data: history.rows[0] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function createHistory(req, res) {
  try {
    const { learner_id, video_id, track_id, completed } = req.body;
    const history = await pool.query(
      "INSERT INTO history (learner_id, video_id, track_id, completed) VALUES ($1, $2, $3, $4) RETURNING *",
      [learner_id, video_id, track_id, completed]
    );
    return res
      .status(200)
      .json({ message: "History was created!", data: history.rows[0] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function updateCompleteTrack(req, res) {
  try {
    const { learner_id, video_id, track_id, completed } = req.body;
    console.log("learner_id:", learner_id);
    console.log("video_id:", video_id);
    console.log("track_id:", track_id);
    console.log("completed:", completed);

    const history = await pool.query(
      "UPDATE history SET completed = $1 WHERE learner_id = $2 AND video_id = $3 AND track_id = $4 RETURNING *",
      [completed, learner_id, video_id, track_id]
    );
    return res
      .status(200)
      .json({ message: "Update history!", data: history.rows[0] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export default {
  getAllHistories,
  getAllHistoriesByLearner,
  getAllHistoriesByVideoOfLearner,
  deleteHistory,
  createHistory,
  updateCompleteTrack,
};
