const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')

router.get('/',chatController.handleGetAllChats)
router.post('/current', chatController.handleGetCurrentChat)
router.post('/', chatController.handleNewChat)
router.post('/addToChat',chatController.handleAddFriendToChat)
module.exports = router