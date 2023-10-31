import express from 'express'
import testController from '../controllers/test.controller.js'

const router = express.Router()

// get all tests
router.get('/', testController.getAllTests)

export default router
