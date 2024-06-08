const express = require('express')
const router = express.Router()

const {registerUser ,login , logout ,loginCheck, changeThePassword, listOfUsers} = require('./controller/user-controller')
const {authenticate,authorization } = require('./middlware/authMiddleware')

//create new user
router.post("/createUser" ,registerUser)
router.post('/login' ,login) 
router.get('/loginCheck' , authenticate ,  loginCheck)
router.get('/logout' , logout)
router.put('/editPassword' , changeThePassword)
router.post('/usersList' , listOfUsers)

module.exports = router