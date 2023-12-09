import express from 'express'
import tagController from '../controllers/tag.controller.js'

const router = express.Router()

// get all categories
router.get('/', tagController.getAllTags)

// search tag by name
router.get('/search', tagController.searchTagByName)

// search tag by id
router.get('/:id', tagController.getTagById)

// delete an tag by id
router.delete('/:id', tagController.deleteTag)

// update tag
router.put('/:id', tagController.updateTag)

// create tag
router.post('/create', tagController.createTag)

export default router
