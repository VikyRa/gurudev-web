
const Chat = require('../../models/chat/ChatSchema');
const User = require('../../models/user/user');
const mongoose = require('mongoose');
const ErrorHander = require("../../utiles/errorhander");
const catchAsyncErrors = require("../../common-middleware/catchAsyncErrors");


// Create new chat between users
exports.savechat = async (req, res, next) => {
    if (!req.body.user) {
        console.log('User id not sent with request');
        return res.sendStatus(400)
    }
 
    let userTo = mongoose.Types.ObjectId(req.body.user._id)
    let userFrom = mongoose.Types.ObjectId(req.user._id)
    
    Chat.findOneAndUpdate(
        {
            users: {
                $all: [
                    { $elemMatch: { $eq: userTo } },
                    { $elemMatch: { $eq: userFrom } },
                ],
            },
        },
        {
            users: [req.body.user._id, req.user._id]
        },
        {
            upsert: true, returnNewDocument: true, setDefaultsOnInsert: true
        },
    )
        .populate('users')
        .then(results => res.status(200).send(results))
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })

};


// Get a list of chats

exports.getchatlist = async (req, res, next) => {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate('users')
        .populate('latestMessage')
        .sort({ updatedAt: -1 })
        .then(async results => {
            results = await User.populate(results, { path: 'latestMessage.sender' })
            res.status(200).send(results)
        })
        .catch(error => {
            console.log(error)
            res.sendStatus(400)
        })

};


// get chat by id
exports.getchatlistbyid = async (req, res, next) => {
    // console.log(req.params.chatId);
    Chat.findOne({ _id:req.params.chatId, users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users")
        .then(results => res.status(200).send(results))
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })

};