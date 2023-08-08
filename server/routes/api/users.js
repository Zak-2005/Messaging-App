const express = require("express")
const path = require('path')
const router = express.Router();
const userController = require('../../controllers/userController')

router.get('/',userController.handleGetAllUsers)
router.post('/',userController.handleGetCurrentUser)
router.post('/otherUser',userController.handleGetOtherUser )
router.put('/bio',userController.handleEditBio)
module.exports = router;