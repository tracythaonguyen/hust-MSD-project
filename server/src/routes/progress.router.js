import express from 'express'
import progressController from '../controllers/progress.controller.js'

const router = express.Router()

// get all progress
router.get('/', progressController.getAllProgress)

// get all progress of learner
router.get('/:learner_id', progressController.getAllProgressOfLearner)

// delete an progress by id
router.delete('/:id', progressController.deleteProgress)

// create an progress
router.post('/create', progressController.createProgress)

export default router
