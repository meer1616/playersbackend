const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/user')

const protect = asyncHandler(async (req, res, next) => {
    let token
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()

        } catch (error) {
            res.status(401).json({ success: false, message: "invalid token" })

        }

    } else {
        res.status(401).json({ success: false, message: "Unauthorized" })
    }

})

module.exports = { protect }