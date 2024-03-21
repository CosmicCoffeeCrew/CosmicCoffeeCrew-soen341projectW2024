const express = require('express')
const router = express.Router()

//controller functions
const{ signupUser, createUser, loginUser, getUsers, getUser, deleteUser, updateUser }= require('../controllers/userController')

//login route
router.post('/login',loginUser)

//signup route
router.post('/signup',signupUser)

//signup route for admin use
router.post('/create',createUser)

//get all users route
router.get('/',getUsers)

//get a single user route
router.get('/:id', getUser)

//delete a user route
router.delete('/:id', deleteUser)

//update a user route
router.patch('/:id',updateUser)




module.exports = router