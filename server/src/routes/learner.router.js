import express from 'express'
import learnerController from '../controllers/learner.controller.js'
import { verifyToken,  verifyAdmin, verifyLearner} from '../middlewares/verifyToken.js'
const router = express.Router()

// get all learners
router.get('/', verifyAdmin, learnerController.getAllLearners)

// delete an learner by id
router.delete('/:id', verifyAdmin,learnerController.deleteLearner)

// create an learner
router.post('/create',verifyAdmin, learnerController.createLearner)

// get an learner by id
router.get('/:id', verifyLearner,learnerController.getLearnerById)

// get an learner by token
router.get('/get-learner-by-token/:token',verifyLearner, learnerController.getLearnerByToken)

export default router
