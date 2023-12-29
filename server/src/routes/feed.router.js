import express from 'express'
import feedController from '../controllers/feed.controller.js'

const router = express.Router()

// get all feedbacks
router.get('/', feedController.getAllFeeds)

// delete an feedback by id
router.delete('/:id', feedController.deleteFeed)

// update feedback content
router.put('/:id', feedController.updateFeedContent)

// create feedback
router.post('/create', feedController.createFeed)

// get feedback by video
router.get('/video/:id', feedController.getAllFeedsByVideo)

export default router
