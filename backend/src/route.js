const express = require('express')
const router = express.Router()

const {registerUser ,login , authCheck} = require('./controller/user-controller')
const {authenticate,authorization } = require('./middlware/authMiddleware')

//create new user
router.post("/createUser" ,registerUser)
router.post('/login' ,login) 
router.get('/authCheck' , authCheck)

module.exports = router