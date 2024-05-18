const express  = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config({path: '../.env'});
const route = require('./route')
const app = express()


app.use(express.json())
app.use(cors())

app.use('/' , route)
let port = process.env.PORT
let mongoDBString = process.env.MONGODB_STRING

mongoose.connect(mongoDBString)
.then(()=> {
    console.log("The mongoDB is connected")
})
.catch((error)=> {
    console.log("The error message : " , error)
})

app.listen(port , () => {
    console.log(`The server is running on https://localhost:${port}`)
})