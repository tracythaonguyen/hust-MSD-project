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

// get an learner by account id
router.get('/account/:id', verifyAdmin,learnerController.getLearnerByAccountId)

export default router
