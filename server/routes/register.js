const express = require("express")
const path = require('path')
const router = express.Router();
const registerController = require('../controllers/registerController')

router.post('/',registerController.registerNewUser)

module.exports = router;