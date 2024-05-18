const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : String , 
    lastName : String , 
    email : String , 
    password : String
},
{
    timestamps : true
})


const User = mongoose.model("User" , userSchema)
module.exports.userModel = User