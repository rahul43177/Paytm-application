const express  = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config({path: '../.env'});
const userRouter = require('./routes/userRoute')
const app = express()
const cookieParser = require('cookie-parser')



app.use(express.json())
const allowedOrigins = ['http://localhost:5173']; // Add your frontend's origin here

app.use(cors({
  origin: allowedOrigins,
  credentials: true // This allows the server to accept credentials (cookies, etc.) from the client
}));
app.use(cookieParser())


app.use('/user/' , userRouter)
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
