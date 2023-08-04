const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')

router.get('/',chatController.handleGetAllChats)
router.post('/', chatController.handleNewChat)

module.exports = router