import express from 'express'
import categoryController from '../controllers/category.controller.js'

const router = express.Router()

// get all categories
router.get('/', categoryController.getAllCategories)

// search category by name
router.get('/search', categoryController.searchCategoryByName)

// get category by id
router.get('/:id', categoryController.getCategoryById)

// delete an category by id
router.delete('/:id', categoryController.deleteCategory)

// update category
router.put('/:id', categoryController.updateCategory)

// create category
router.post('/create', categoryController.createCategory)

export default router
