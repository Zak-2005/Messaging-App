const express = require("express")
const path = require('path')
const router = express.Router();
const friendController = require('../controllers/friendController')

router.delete('/',friendController.handleRemoveFriend)
router.post('/',friendController.handleAddFriend)

module.exports = router;