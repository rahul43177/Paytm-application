const express = require('express')
const router = express.Router()

const {registerUser ,login ,loginCheck} = require('./controller/user-controller')
const {authenticate,authorization } = require('./middlware/authMiddleware')

//create new user
router.post("/createUser" ,registerUser)
router.post('/login' ,login) 
router.get('/loginCheck' , authenticate ,  loginCheck)

module.exports = router