const userModel = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({
    path : "../../.env"
})

function calculation (req,res) {
    
}
let a = 12 
let b= 12 

module.exports.registerUser = async (req,res)=> {
    try { 
        let {firstName , lastName , email  , password , role } = req.body
        if(!(firstName && lastName && email && password)) {
            console.log("All the required fields are not present")
            return res.status(400).json({
                status : false , 
                message : "Please enter all the required fields."
            })
        }

        const findUserInDB = await userModel.findOne({
            email : email
        })
        if(findUserInDB == true) {
            console.log("The user already present in the DB")
            return res.status(400).json({
                status : false , 
                message : "User already exist with this email address."
            })
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        
        let userDetials = {
            firstName , 
            lastName , 
            email , 
            password : hashedPassword ,
            role
        }

        password = undefined;

        let createUser = await userModel.create(userDetials);

        let token = jwt.sign(
            {
                id : createUser._id , 
                role : createUser.role
            } ,
            process.env.JWT_SECRETCODE
        )

        res.cookie('token' , token , {httpOnly : true})
        res.status(201).json({
            status : false , 
            message : "User Registed successfully" ,
            token
        })
    } catch(error) {
        res.status(500).json({
            status : false , 
            error : error , 
            errorMessage : error.message
        })
    }
}


module.exports.login = async (req,res) => {
    try{
    let {email , password} = req.body
    if(!(email && password)) {
        console.log("Both not entered - email and password")
        return res.status(400).json({
            status : false , 
            message : "Please enter all the fields."
        })
    }
    const findUser = await userModel.findOne({
        email : email
    })
    console.log("🚀🚀🚀 ~ module.exports.login= ~ findUser:", findUser)

    if(!findUser) {
        console.log("The user is not present in the DB")
        return res.status(400).json({
            status : false , 
            message : "The user is not present in the Database."
        })
    }

    //check the password
    const isMatch = await bcrypt.compare(password , findUser.password)
    if(!isMatch) {
        console.log("The password is not matching")
        return res.status(400).json({
            status : false , 
            message : "The password is incorrect."
        })
    }
    //app.get(req,res) -> res. 
    console.log("The password is matched")
    const token = jwt.sign({
        id : findUser._id , 
        role : findUser.role
    },
    process.env.JWT_SECRETCODE ,
    {
        expiresIn : "1h"
    }
    )

    res.cookie('token' , token , {httpOnly : true})
    return res.status(200).json({
        status : false , 
        message : "The user is logged in successfully" ,
        token
    })

    } catch(error) {
        return res.status(500).json({
            status : false , 
            error : error , 
            errorMessage : error.message
        })
    }
}


module.exports.logout = async (req,res) => {
    res.cookie('token' , '' , {httpOnly : true , expires : new Date(0)});
    res.status(200).json({
        status : true , 
        message : "Logged out successfully."
    })
}