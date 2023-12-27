import express from 'express'
import categoryController from '../controllers/category.controller.js'
import { verifyToken, verifyAdmin } from '../middlewares/verifyToken.js'
const router = express.Router()

// get all categories
router.get('/', categoryController.getAllCategories)

// search category by name
router.get('/search', categoryController.searchCategoryByName)

// get category by id
router.get('/:id', categoryController.getCategoryById)

// delete an category by id
router.delete('/:id',verifyAdmin, categoryController.deleteCategory)

// update category
router.put('/:id', verifyAdmin,categoryController.updateCategory)

// create category
router.post('/create', verifyAdmin,categoryController.createCategory)

export default router
