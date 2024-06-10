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

        const {amount , to } = req.body
        
        const senderDetails = req.user
        const userId = senderDetails.id 
        const accountOfSender = await Account.findOne({
            user : userId
        })
        if(!accountOfSender || accountOfSender.balance > amount ) {
            await session.abortTransaction()
            return res.status(400).json({
                status : false ,
                message : "Insufficient Funds"
            })
        }

        const toUser = await userModel.fineOne({
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