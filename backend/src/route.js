const express = require('express')
const router = express.Router()

const {registerUser ,login} = require('./controller/user-controller')
const {authenticate,authorization } = require('./middlware/authMiddleware')

//create new user
router.post("/createUser" ,registerUser)
router.post('/login' ,login) 


module.exports = router