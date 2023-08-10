const logoutController = require('../controllers/logoutController')
const express = require('express')
const router = express.Router();

router.delete('/',logoutController.handleLogout)

module.exports = router