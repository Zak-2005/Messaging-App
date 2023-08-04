const Chat = require("../models/Chat");

const handleNewChat = async (req, res) => {
  const { chat } = req.body;
  if(!chat) res.status(400).json({msg: "Please enter a chat field"})
  try{
  const createChat = await Chat.create({
    "name": chat
  })
  console.log(createChat)
  res.json({msg: `Your chat: ${chat} was created successfully!`})
}catch(err){
    console.error(err)
    res.status(500).json({msg:"Failed to create chat"})
}
};

const handleGetAllChats = async(req,res)=>{
    const allChats = await Chat.find()
    res.json(allChats)

}

module.exports = {handleNewChat,handleGetAllChats}