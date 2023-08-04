const Chat = require("../models/Chat");
const Message = require('../models/Message')

const handleNewMessage = async (req, res) => {
  const { currentChat, message } = req.body;
  const groupChat = await Chat.findOne((chat)=>chat.name===currentChat);
  const sendNewMessage = await Message.create({
    "chat": currentChat,
    "message": message
  })
};

module.exports = {handleNewMessage}