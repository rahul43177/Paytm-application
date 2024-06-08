const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
        required : true 
    },
    balance : {
        type : Number , 
        required : true
    }
})

const Account = mongoose.model("Account" , accountSchema)

module.exports =  Account