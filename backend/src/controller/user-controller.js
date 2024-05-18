const {userModel} = require('../models/users')
const jwt = require("jsonwebtoken")
require('dotenv').config({
    path : "../../.env"
})


module.exports.signUpUser = async (req,res) => {
    const {firstName , lastName , email , password} = req.body

    if(!firstName || !lastName || !email || !password) { 
        return res.status(400).json({
            status : false , 
            message : "Please enter all the required things"
        })
    }
    const emailPresentOrNot = await userModel.find({
        email : email
    })
    console.log("🚀 ~ module.exports.signUpUser= ~ emailPresentOrNot:", emailPresentOrNot)
    if(emailPresentOrNot.length > 0) {
        console.log("The user with same email already present in the DB")
        return res.status(400).json({
            status : false , 
            message : "The user is already present in the DB"
        })
    }

    const createNewUser = await userModel.create({
        firstName : firstName , 
        lastName : lastName , 
        email : email , 
        password : password
    })
    console.log("The user collection" , createNewUser)
    console.log("The new user has been created in the Database")
    res.status(200).json({
        status : true , 
        message : "The new user has been created."
    })
}

//create a login API 
module.exports.login = async (req,res) => {
    const {email , password} = req.body
    if(!email || !password) {
        return res.status(400).json({
            status : false , 
            message : "Both email/password are required."
        })
    }

    const findUser = await userModel.findOne({
        email
    })
    if(!findUser) {
        return res.status(400).json({
            status : false , 
            message : "The User does not exist in the DB"
        })
    }

    
 }

