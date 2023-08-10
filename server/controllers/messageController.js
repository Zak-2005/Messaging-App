const Chat = require("../models/Chat");
const Message = require("../models/Message");

const handleNewMessage = async (req, res) => {
  const { chat, message, user } = req.body;
  if (!chat || !message || !user) {
    return res.status(400).json({ msg: "Please have a chat, message, and user" });
  }
  try {
    const groupChat = await Chat.findOne({ chatID: chat.id }).exec();
    if (!groupChat) {
      return res.status(404).json({ msg: "Chat does not exist" });
    }
    const sendNewMessage = await Message.create({
      chat: chat.id,
      message: message,
      user: user
    });
    res.status(200).json({ msg: "Message was successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json("Failed to send message");
  }
};

const handleGetChatMessages = async (req, res) => {
  const { currentChat } = req.body;
  if (!currentChat) {
    return res.status(400).json({ msg: "Please have a chat" });
  }
  try {
    const chatExists = await Chat.findOne({ chatID: currentChat.id }).exec();
    if (!chatExists) {
      return res.status(400).json({ msg: "Chat does not exist" });
    }
    const chatMessages = await Message.find({ chat: currentChat.id }).exec();
    res.json(chatMessages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to load messages" });
  }
};
module.exports = { handleNewMessage, handleGetChatMessages };
