const express = require("express")
const path = require('path')
const router = express.Router();
const refreshController = require('../controllers/refreshController')
const cookieParser = require('cookie-parser')
router.use(cookieParser())

router.post('/',refreshController.handleRefreshToken)

module.exports = router;