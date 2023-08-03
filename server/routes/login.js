const express = require("express")
const path = require('path')
const router = express.Router();
const loginController = require('../controllers/loginController')

router.post('/',loginController.handleLogin)

module.exports = router;