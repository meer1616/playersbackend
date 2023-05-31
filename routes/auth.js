const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()
const { authController, LogoutController, getUser, registerUser, updateUser } = require('../controller/authControler')

router.post('/', registerUser)
router.post('/auth', authController)
router.post('/logout', LogoutController)
router.route('/profile').get(protect, getUser).put(protect, updateUser)




module.exports = router

