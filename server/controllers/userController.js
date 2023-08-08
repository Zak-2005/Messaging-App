const User = require('../models/User')
const jwt = require("jsonwebtoken");
const bcrypt= require('bcrypt')

const handleGetCurrentUser = async (req, res) => {
    console.log(req.cookies)
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({refreshToken}).exec()
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    res.json({ foundUser });
  });
};

const handleGetOtherUser = async(req,res)=>{
    const {user} = req.body
    if(!user) return res.status(400).json({msg:"No user entered"})
    const foundUser = await User.findOne({username:user}).exec()
    if(!foundUser) return res.status(400).json({msg:"User does not exist"})
    res.status(201).json(foundUser)
}
const handleGetAllUsers = async(req,res)=>{
    const allUsers = await User.find().exec();
    console.log(allUsers)
    res.json(allUsers)
}

const handleEditBio = async(req,res)=>{
    const {user,bio} = req.body
    if(!user || !bio) res.status(400).json({msg:"Please enter a user and a bio"})
    const foundUser = await User.findOne({username:user})
    if(!foundUser) res.status(400).json({msg:"User does not exist"})
    try{
        foundUser.bio = bio;
        await foundUser.save()
        return res.status(200).json({msg:"Successfully updated bio"})
    }catch(err){
        console.error(err)
        res.status(500).json({msg:"Failed to update bio"})
    }
}
const handleEditUsername = async(req,res)=>{
    const {currentUsername,newUsername} = req.body
    if(!currentUsername || !newUsername) return res.status(400).json({msg:"Please enter a currentUsername and a newUsername"})
    const foundCurrentUsername = await User.findOne({username:currentUsername}).exec()
    if(!foundCurrentUsername) return res.status(400).json({msg:"User does not exist"})
    try{
        foundCurrentUsername.username = newUsername;
        await foundCurrentUsername.save()
        return res.status(200).json({msg:"Successfully updated username"})
    }catch(err){
        console.error(err)
        return res.status(500).json({msg:"Failed to update username"})
    }
}
const handleChangePass = async(req,res)=>{
    const {user,oldPass,newPass} = req.body
    if(!user || !oldPass || !newPass) return res.status(400).json({msg:"Please enter a user, your old pass, and a new pass"})
    const foundUser = await User.findOne({username:user}).exec()
    if(!foundUser) return res.status(400).json({msg:"User does not exist"})
    const confirmOldPass = await bcrypt.compare( oldPass,foundUser.password)
    console.log(oldPass)
    console.log(foundUser)
    if(!confirmOldPass) return res.status(400).json({msg:"Old password incorrect"})
    if(confirmOldPass && oldPass===newPass) return res.status(400).json({msg:"Password already in use"})
    try{
        const hashNewPass = await bcrypt.hash(newPass, 10)
        foundUser.password = hashNewPass
        await foundUser.save()
        console.log(foundUser.password)
        return res.status(200).json({msg:"Successfully updated password"})
    }catch(err){
        console.error(err)
        return res.status(500).json({msg:"Failed to update password"})
    }
}
module.exports = { handleGetCurrentUser,handleGetAllUsers, handleGetOtherUser, handleEditBio,handleEditUsername, handleChangePass};
