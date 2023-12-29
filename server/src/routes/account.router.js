import express from 'express'
import accountController from '../controllers/account.controller.js'
import { verifyAdmin } from '../middlewares/verifyToken.js'
const router = express.Router()
//login
router.post('/login', accountController.login)
// //register
router.post('/register', accountController.createAccount)

// get all accounts
router.get('/',verifyAdmin, accountController.getAllAccounts)

// search account by username
router.get('/search', accountController.searchAccountByUserName)

// delete an account by id
router.delete('/:id', verifyAdmin,accountController.deleteAccount)

// update account username
router.put('/change-name/:id', accountController.updateUserName)

// create account
router.post('/create', accountController.createAccount)

// get account by token
router.get('/get-account-by-token/:token', accountController.getAccountByToken)

export default router
