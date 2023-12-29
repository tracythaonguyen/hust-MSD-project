import express from 'express'
import favoriteController from '../controllers/favorite.controller.js'
const router = express.Router()

// get all favorites
router.get('/', favoriteController.getAllFavorite)

// get all favorites by learner
router.get('/learner/:learner_id', favoriteController.getAllFavoriteByLearner)

// get all favorites by video
router.get('/video/:video_id', favoriteController.getAllFavoriteByVideo)

// delete an favorite by id
router.delete('/:id', favoriteController.deleteFavorite)

// create favorite
router.post('/create', favoriteController.createFavorite)

export default router
