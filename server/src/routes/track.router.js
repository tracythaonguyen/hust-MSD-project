import express from 'express'
import videoController from '../controllers/track.controller.js'

const router = express.Router()

// get all tracks
router.get('/', videoController.getAllTracks)

// get all tracks of a video
router.get('/:video_id', videoController.getAllTracksOfVideo)

// delete a track of a video
router.delete('/:video_id/:track_id', videoController.deleteTrackOfVideo)

// create a track of a video
router.post('/create', videoController.createTrack)

// update a track of a video
router.put('/:video_id/:track_id', videoController.updateTrackTimeOfVideo)

export default router
