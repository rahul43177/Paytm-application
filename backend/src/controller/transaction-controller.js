const mongoose = require('mongoose')
const Account = require('../models/account')
const userModel = require('../models/users')
module.exports.balanceOfTheUser = async (req,res) => {
    try {
        const {userEmail} = req.body
        const user = await userModel.findOne({
            email : userEmail
        })
        const userId = user._id
        const balance = await Account.findOne({
            user : userId
        })

        return res.status(200).json({
            status : true , 
            balance : balance
        })
    } catch(error) {
        return res.status(500).json({
            status : false , 
            error: error , 
            errorMessage :error.message
        })
    }
}


module.exports.transfer = async (req,res) => {
    try {
        const session = await mongoose.startSession()

        session.startTransaction()

        let {  amount , to , from } = req.body
        amount = Number(amount)
        if(amount == NaN) {
            return res.status(400).json({
                status : false , 
                message : "Please enter valid Amount"
            })
        }

        console.log("user details " , req.user)
        const senderDetails = await userModel.findOne({
            email : from
        })
        const userId = senderDetails.id 
        const accountOfSender = await Account.findOne({
            user : userId
        })
        if(!accountOfSender || accountOfSender.balance < amount ) {
            await session.abortTransaction()
            return res.status(400).json({
                status : false ,
                message : "Insufficient Funds"
            })
        }

        const toUser = await userModel.findOne({
            email : to
        })
        const toUserId = toUser._id

        const accountOfReceiver = await Account.findOne({
            user : toUserId 
        })

        if(!accountOfReceiver) {
            await session.abortTransaction()
            return res.status(500).json({
                status : false , 
                message : "Invalid Account"
            })
        }

        await Account.updateOne(
            {
                user : userId
            } , 
            {
                $inc : {
                    balance : -amount
                }
            }
        ).session(session)

        await Account.updateOne(
            {
                user : toUserId 
            } ,
            {
                $inc : {
                    balance : amount 
                }
            }
        ).session(session)

        await session.commitTransaction()
        return res.json({
            status : true , 
            message : "Transfer completed"
        })
    } catch(error) {
        return res.status(500).json({
            status : false , 
            error : error, 
            errorMessage : error.message
        })
    }
}


module.exports.updateFunds = async (req,res) => {
    try {

        let {userEmail , amount } = req.body

        amount = Number(amount)
        if(amount <= 0 || isNaN(amount)) {
            return res.status(400).json({
                status : false , 
                message : "Please enter a valid Number"
            })
        }


        const user = await userModel.findOne({
            email : userEmail
        }) 

        if(!user) {
            return res.status(404).json({
                status : false , 
                message : "user not found"
            })
        }

        const userId = user._id 
        const balanceUpdate = await Account.updateOne(
            {
                user : userId 
            } , 
            {
                $inc : {
                    balance : amount
                }
            } ,
            {
                new : true
            }
        )

        return res.status(201).json({
            status : true , 
            message : "The amount has been udpated"
        })
    } catch(error) {
        return res.status(500).json({
            status : false ,
            error : error , 
            errorMessage : error.message
        })
    }
}