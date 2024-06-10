const express = require('express')
const { transfer } = require('../controller/transaction-controller')
const router = express.Router()

router.post('/transaction' , transfer)

module.exports = router