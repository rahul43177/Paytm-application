const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : String , 
    lastName : String , 
    email : {
        type : String , 
        unique : true 
    } ,
    password : String, 
    role : {
        type : String   , 
        enum : ["admin" , "users" , "superusers"], 
        default : "users"
    }
},
{
    timestamps : true
})


const User = mongoose.model("User" , userSchema)
module.exports = User