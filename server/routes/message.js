const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')

router.post('/all', messageController.handleGetChatMessages)
router.post('/', messageController.handleNewMessage)

module.exports = router