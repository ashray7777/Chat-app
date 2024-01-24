const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

//Create or fetch 2 users chat - POST /api/chat/ Protected
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if(!userId) {
        console.log("User id not send with request");
        return res.status(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if(isChat.length > 0){
        res.send(isChat[0]);
    } else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId], 
        };

        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");
            res.status(200).json(fullChat);
        } catch(error){
            res.status(400);
            throw new Error(error.message);
        }
    }
});

//Fetch all users - GET /api/chat  request Protected
const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1})
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
            });
            res.status(200).send(results);
        });
    } catch(error){
        throw new Error(error.message);
    }
});


//Create new group chat - Post /api/chat/group Protected
const createGroupChat = asyncHandler( async(req,res) => {
    if(!req.body.users || !req.body.name){
        return res.status(400).send({ message: "Please fill all the fields"});
    }

    var users = JSON.parse(req.body.users);

    if(users.length < 2){
        return res.status(400).send({ message: "More than 2 users are required to form a group chat"});
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChatDetails = groupChat.findOne({ _id: groupChat._id })
            .populate("users","-password")
            .populate("groupAdmin","-password")

        res.status(200).json(fullGroupChatDetails);
    } catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});


//Rename group - Put /api/chat/rename Protected
const renameGroup = asyncHandler(async(req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChatName = await Chat.findByIdAndUpdate(
        chatId, { chatName: chatName}, { new: true })
        .populate("users","-password").populate("groupAdmin","-password");

    if(!updatedChatName){
        res.status(404);
        throw new Error("Chat not found");
    } else{
        res.json(updatedChatName);
    }
});


//Remove user from group - Put /api/chat/groupremove Protected
const removeFromGroup = asyncHandler(async(req, res) => {
    const { chatId, userId } = req.body;

    const updatedGroup = await Chat.findByIdAndUpdate(
        chatId, { $pull : {users: userId},}, { new: true } )
        .populate("users", "-password").populate("groupAdmin", "-password");
    
    if(!updatedGroup){
        res.status(404);
        throw new Error("Chat not found");
    } else{
        res.json(updatedGroup);
    }
});


//Add user to group - Put /api/chat/groupAdd Protected
const addToGroup = asyncHandler(async(req, res) => {
    const { chatId, userId } = req.body;

    const updatedGroup = await Chat.findByIdAndUpdate(
        chatId, { $push : {users: userId},}, { new: true } )
        .populate("users", "-password").populate("groupAdmin", "-password");
    
    if(!updatedGroup){
        res.status(404);
        throw new Error("Chat not found");
    } else{
        res.json(updatedGroup);
    }
});

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup };