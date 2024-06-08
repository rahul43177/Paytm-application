const userModel = require('../models/users')
const Account = require('../models/account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({
    path : "../../.env"
})

module.exports.registerUser = async (req,res)=> {
    try { 
        let {firstName , lastName , email  , password , role , balance } = req.body
        console.log("🚀 ~ module.exports.registerUser= ~ role:", role)
        
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
        if(findUserInDB) {
            console.log("The user already present in the DB")
            return res.status(400).json({
                status : false , 
                message : "User already exist with this email address."
            })
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        firstName = firstName.trim()
        lastName = lastName.trim()
        password = password.trim()
        email = email.trim()
        let userDetials = {
            firstName , 
            lastName , 
            email , 
            password : hashedPassword ,
            role
        }
        console.log("🚀 ~ module.exports.registerUser= ~ userDetials.role:", userDetials.role)

        password = undefined;

        let createUser = await userModel.create(userDetials);
        const userId = createUser._id
        const balanceAdd =await Account.create({
            user : userId , 
            balance : balance
        })


        let token = jwt.sign(
            {
                id : userId, 
                role : createUser.role
            } ,
            process.env.JWT_SECRETCODE
        )

        res.cookie('token' , token , {httpOnly : true})
        res.status(201).json({
            status : true , 
            message : "User Registed successfully" ,
            token , 
            balanceAdded : balance
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
        role : findUser.role ,
        email : findUser.email
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
        email , 
        role : findUser.role
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


module.exports.loginCheck = async (req,res) => {
    try {
        console.log("inside the loginCheck")
        console.log("req.user- " , req.user)
        if(req.user) {
            let userData = req.user
            console.log(`user details -> ${req.user} `)
            return res.status(200).json({
                status : true , 
                loggedIn : true ,
                message : "Welcome" , 
                userData : userData
            })
        }
        else {
            return res.status(200).json({
                status : false , 
                loggedIn : false ,
                message : "The user is not allowed"
            })
        }
    } catch(error) {
        conosle.log("erorr" , error)
        conosle.log("erorr message" , error.message)
        res.status(500).json({
            status : false , 
            error
        })
    }
}

module.exports.changeThePassword = async (req,res) => {
    try {
        const {email , oldPassword , newPassword} = req.body
        if(!(email && oldPassword && newPassword)) {
            console.log("Both the things not given")
            return res.status(400).json({
                status : false ,
                message : "Please enter both the mandatory fields."
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
        const isMatch = await bcrypt.compare(oldPassword , findUser.password)
        if(!isMatch) {
            console.log("The old password enetered is wrong")
            return res.status(403).json({
                status : false , 
                message : "The old password provided is incorrect."
            })
        }

        const updateThePassword = await userModel.findOneAndUpdate(
            {email : email } , 
            {password : await bcrypt.hash(newPassword , 10)} ,
            {new : true }
        )

        console.log('updateThePassword' , updateThePassword)
        return res.status(200).json({
            status : true , 
            message : "The password is updated successfully." ,
            updatedValue : updateThePassword
        })

    } catch(error) {
        return res.status(500).json({
            status : false, 
            error : error , 
            errorMessage : error.message
        })
    }
}


module.exports.listOfUsersWithBalance = async (req,res) => {
    try {
        const users = await userModel.aggregate([
            {
                $lookup : {
                    from : "accounts" , 
                    localField : "_id" ,
                    foreignField : "user" ,
                    as : "account"
                }
            } ,
            {
                $project : {
                    firstName : 1 ,
                    lastName : 1 ,
                    email : 1 , 
                    balance : "$account.balance"
                }
            }
        ]);
        console.log("🚀 ~ module.exports.listOfUsersWithBalance= ~ users:", users)
        const formattedUsers = users.map((user)=> ({
            _id : user._id , 
            name : `${user.firstName} ${user.lastName}` ,
            email : user.email , 
            balance : user.balance[0] ? user.balance[0] : 0
        }))
        console.log("🚀 ~ formattedUsers ~ formattedUsers:", formattedUsers)
       


        return res.status(200).json({
            status : true , 
            userData : formattedUsers
        })




    } catch(error) {
        return res.status(500).json({
            status : false ,
            error : error  ,
            errorMessage : error.message
        })
    }
}
