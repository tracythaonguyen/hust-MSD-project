import express from 'express'
import historyController from '../controllers/history.controller.js'

const router = express.Router()

// get all histories
router.get('/', historyController.getAllHistories)

// get all histories by learner
router.get('/learner/:learner_id', historyController.getAllHistoriesByLearner)

// get all histories by video of learner
router.get(
  '/learner/:learner_id/video/:video_id',
  historyController.getAllHistoriesByVideoOfLearner,
)

// delete an history by id
router.delete('/:id', historyController.deleteHistory)

// create history
router.post('/create', historyController.createHistory)

export default router
