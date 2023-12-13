import express from 'express'
import learnerController from '../controllers/learner.controller.js'

const router = express.Router()

// get all learners
router.get('/', learnerController.getAllLearners)

// delete an learner by id
router.delete('/:id', learnerController.deleteLearner)

// create an learner
router.post('/create', learnerController.createLearner)

export default router
