const express = require('express')
const { balanceOfTheUser, updateFunds } = require('../controller/transaction-controller')
const router = express.Router()

router.post("/getBalance" , balanceOfTheUser)
router.put('/addFunds' , updateFunds) 

module.exports = router