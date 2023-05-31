const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()
const { searchChatUser, fetchChats, accessChat, createGroupChat, renameGroup, addToGroup } = require('../controller/chatController')

router.get('/', protect, searchChatUser)
router.get('/getchats', protect, fetchChats)
router.post('/', protect, accessChat)
router.post('/group', protect, createGroupChat)
router.put('/rename', protect, renameGroup)
// router.put('/groupremove', protect,)
router.put('/groupadd', protect, addToGroup)

// router.post('/auth', authController)
// router.post('/logout', LogoutController)
// router.route('/profile').get(protect, getUser).put(protect, updateUser)




module.exports = router

