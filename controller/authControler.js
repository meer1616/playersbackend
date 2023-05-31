const asyncHandler = require('express-async-handler') // dont need to wrap into the try catch block
const User = require('../model/user')
const { generateToken } = require('../utils/generateToken')

const authController = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        generateToken(res, user._id)
        return res.status(201).json({ success: true, message: "Login successfully", data: user })
    } else {
        return res.status(401).json({ success: false, message: "Invalid Email or Password" })
    }
})

const LogoutController = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ success: true, message: "User logged out successfully" })
})

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body


    const UserExist = await User.findOne({ email })
    if (UserExist) {
        res.status(400).json({ success: false, message: "User Already Exist" })
    }
    const user = await new User({ name, email, password })
    const savedUser = await user.save()
    if (savedUser) {
        generateToken(res, savedUser._id)
        return res.status(201).json({ success: true, message: "User registered successfully", data: savedUser })
    } else {
        return res.status(400).json({ success: false, message: "Something went wrong" })
    }

})

const getUser = asyncHandler(async (req, res) => {
    res.status(200).json({ success: true, message: "get user", data: req.user })

})

const updateUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = name || user.name
        user.email = email || user.email
    }
    if (req.body.password) {
        user.password = req.body.password
    }
    const updatedUser = await user.save()

    res.status(200).json({
        success: true,
        data: updatedUser
    })
    // res.send('hi')
})


module.exports = { authController, LogoutController, registerUser, getUser, updateUser }