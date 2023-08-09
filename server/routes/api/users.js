const express = require("express")
const path = require('path')
const router = express.Router();
const userController = require('../../controllers/userController')
const verifyJWT = require('../../controllers/verifyJWT')
router.get('/',userController.handleGetAllUsers)
router.post('/',verifyJWT,userController.handleGetCurrentUser)
router.post('/otherUser',userController.handleGetOtherUser )
router.put('/bio',userController.handleEditBio)
router.put('/newUsername',verifyJWT,userController.handleEditUsername)
router.put('/newPass',verifyJWT,userController.handleChangePass)
module.exports = router;