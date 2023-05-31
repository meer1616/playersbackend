const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler"); // dont need to wrap into the try catch block
const Chat = require("../model/chatModel");
const User = require("../model/user");
// const user = require('../model/user')

const searchChatUser = asyncHandler(async (req, res) => {
    console.log("re", req.user);
    const searchText = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};
    const user = await User.find(searchText).find({
        _id: { $ne: mongoose.Types.ObjectId(req.user._id) },
    });

    res.status(200).json({ success: true, data: user });
});

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body

    const added = await Chat.findOneAndUpdate(chatId, {
        $push: { users: userId }
    }, {
        new: true
    }).populate('users', '-password').populate('groupAdmin', '-password')

    if (!added) {
        return res.status(404).json({ success: false, messgae: "chat not found" })
    }
    else {
        res.status(200).json({ success: true, data: added });
    }

});

const removefromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body


    const added = await Chat.findOneAndUpdate(chatId, {
        $pull: { users: userId }
    }, {
        new: true
    }).populate('users', '-password').populate('groupAdmin', '-password')

    if (!added) {
        return res.status(404).json({ success: false, messgae: "chat not found" })
    }
    else {
        res.status(200).json({ success: true, data: added });
    }

});

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body

    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
        $set: { chatName }
    },
        {
            new: true
        }
    ).populate('users').populate('groupAdmin')

    if (!updatedChat) {
        return res.status(404).json({ success: false, messgae: "chat not found" })
    }
    else {
        res.status(200).json({ success: true, data: updatedChat });
    }

});

const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ success: 400, message: "please enter all the fields" })
    }

    const users = JSON.parse(req.body.users)
    if (users.length < 2) {
        return res.status(400).json({ success: false, message: "More than 2 users are required to form group chat" })
    }
    users.push(req.user)

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users,
            isGroupChat: true,
            groupAdmin: req.user
        })

        const group = await Chat.populate(groupChat, {
            path: "users"
        })

        res.status(200).json({ success: true, data: group })

    } catch (error) {
        res.status(400).json({ success: false, message: "Internal server error" })
    }


});

const accessChat = asyncHandler(async (req, res) => {
    console.log("req.user", req.user);
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "userId not sent" });
    }
    console.log("userId", userId);
    let chatUser = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: mongoose.Types.ObjectId(req.user._id) } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    console.log("chatUser", chatUser);
    chatUser = await User.populate(chatUser, {
        path: "latestMessage.sender",
        select: "name email",
    });
    console.log("logchatUser", chatUser);
    // let NewchatUser = await User.aggregate([
    //     {
    //         $lookup: {
    //             from: "Chat",
    //             // let:
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         isGroupChat: false,
    //                         $and: [
    //                             {
    //                                 users: {
    //                                     $elemMatch: { $eq: mongoose.Types.ObjectId(req.user._id) },
    //                                 },
    //                             },
    //                             { users: { $elemMatch: { $eq: userId } } },
    //                         ],
    //                     },
    //                 },
    //             ],
    //             as: "temp"
    //         },
    //     },
    // ]);

    // console.log("NewchatUser", NewchatUser);

    if (chatUser.length > 0) {
        res.status(200).json({ success: true, data: chatUser[0] });
    } else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            console.log("dfghj");
            const createdChat = await Chat.create(chatData);
            console.log("createdChat", createdChat);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );

            res.status(200).json({ success: true, data: fullChat });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }
});

const fetchChats = asyncHandler(async (req, res) => {
    const chat = await Chat.find({
        users: { $elemMatch: { $eq: req.user._id } },
    }).populate("users", '-password').populate('groupAdmin', '-password').populate('latestMessage').sort({ updateAt: -1 })
    // .then(async (result) => {
    //     result = await User.populate(result, {
    //         path: "latestMessage.sender",
    //         select: "name email"
    //     })
    // });
    console.log("chat", chat);
    res.status(200).json({ success: true, data: chat });
});

module.exports = {
    searchChatUser,
    accessChat,
    addToGroup,
    createGroupChat,
    fetchChats,
    renameGroup,
    removefromGroup
};
