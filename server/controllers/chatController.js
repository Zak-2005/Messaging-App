const Chat = require("../models/Chat");
const User = require("../models/User")
const handleNewChat = async (req, res) => {
  const { chat, user } = req.body;
  if(!chat || !user) return res.status(400).json({msg: "Please enter a chat and user field"})
  const foundUser = await User.findOne({username:user})
  if(!foundUser) return res.status(400).json({msg:"User does not exist"})
  try{
  const createChat = await Chat.create({
    "name": chat,
    "users": [foundUser._id]
  })
  res.json({msg: `Your chat: ${chat} was created successfully!`})
}catch(err){
    console.error(err)
    res.status(500).json({msg:"Failed to create chat"})
}
};

const handleGetAllChats = async(req,res)=>{
    const allChats = await Chat.find().exec()
    res.json(allChats)

}
const handleGetCurrentChat = async(req,res)=>{
    const {chat} =req.body
    if(!chat) return res.status(400).json({msg:"Please include a chat name"})
    const currentChat = await Chat.findOne({name:chat}).exec()
    if(!currentChat) return res.status(400).json({msg:"Chat does not exist"})
    return res.json(currentChat)
}

const handleAddFriendToChat = async(req,res) =>{
    const {chat, user} = req.body;
    if(!user) return res.status(400).json({msg:"Please enter a user to be added"})
    const foundUser = await User.findOne({username:user}).exec()
    if(!foundUser) return res.status(400).json({msg:"User does not exist"})
    const chatExists = await Chat.findOne({name:chat}).exec()
    if(!chatExists) return res.status(400).json({msg:"Chat does not exist"})
    const duplicate = chatExists.users.find((username)=>username===user)
    if(duplicate) return res.status(400).json({msg:"User already in chat"})
    try{
        chatExists.users.push(foundUser._id)
        await chatExists.save()
        return res.status(200).json({msg: "User successfully added to chat"})
    }catch(err){
        console.error(err)
        return res.status(500).json({msg: "Failed to add user to chat"})
    }
}
module.exports = {handleNewChat,handleGetAllChats,handleAddFriendToChat,handleGetCurrentChat}