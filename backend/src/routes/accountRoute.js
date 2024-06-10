const express = require('express')
const { balanceOfTheUser } = require('../controller/transaction-controller')
const router = express.Router()

router.post("/getBalance" , balanceOfTheUser)


module.exports = router