const express = require('express')
const router = express.Router()

const {signUpUser ,login } = require('./controller/user-controller')

//create new user
router.post("/createUser" , signUpUser)
router.post("/login" , login)


module.exports = router