const express  = requrie('express')
const mongoose = require('mongoose')
const cors = require('cors')
//dotenv 
require('dotenv').config()

const app = express()
let port = 3000


app.use(express.json())

app.listen(port , () => {
    console.log(`The server is running on https://localhost:${port}`)
})