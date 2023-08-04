const express = require("express")
const path = require('path')
const router = express.Router();
const userController = require('../../controllers/userController')

router.get('/',userController.handleGetAllUsers)
router.post('/',userController.handleGetUser)

module.exports = router;