const User = require("../models/User");
const Chat = require("../models/Chat");
const bcrypt = require("bcrypt");
const registerNewUser = async (req, res) => {
  console.log(req.body);
  const { user, pass } = req.body;
  if (!user || !pass) {
    return res.status(400).json({ msg: "Username and password required" });
  }
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    const hashedPwd = await bcrypt.hash(pass, 10);
    const createUser = await User.create({
      username: user,
      bio:"",
      password: hashedPwd,
    });
    const mainChatExists = await Chat.findOne({ name: "Main Chat" }).exec();
    if (!mainChatExists) {
     const mainChat = await Chat.create({
        name: "Main Chat",
      });
      mainChat.users.push(createUser._id);
      await mainChat.save();
    }
    else{
        mainChatExists.users.push(createUser._id);
        await mainChatExists.save();
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { registerNewUser };
