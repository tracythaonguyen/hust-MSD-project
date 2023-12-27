import express from 'express'
import progressController from '../controllers/progress.controller.js'
import { verifyToken, verifyAdmin, verifyLearner } from '../middlewares/verifyToken.js'

const router = express.Router()

// get all progress
router.get('/',verifyAdmin,progressController.getAllProgress)

// get all progress of learner
router.get('/:learner_id', verifyLearner,progressController.getAllProgressOfLearner)

// delete an progress by id
router.delete('/:id', verifyLearner ,progressController.deleteProgress)

// create an progress
router.post('/create', progressController.createProgress)

export default router
