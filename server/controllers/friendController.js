const User = require("../models/User");

const handleAddFriend = async (req, res) => {
  const { user, friend } = req.body;
  if (!user || !friend) {
    return res.status(400).json({ msg: "Please enter a user and a friend" });
  }
  const foundUser = await User.findOne({ username: user }).exec();
  const foundFriend = await User.findOne({ username: friend }).exec();
  if (!foundUser || !foundFriend) {
    return res.status(400).json("The user or friend does not exist");
  }
  const duplicate = foundUser.friends.includes(foundFriend.username);
  if (duplicate) {
    return res.status(400).json("This user is already added");
  }
  try {
    foundUser.friends.push(foundFriend._id);
    await foundUser.save();
    res.json({ msg: "Successfully added friend" });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Failed to add friend");
  }
};
const handleRemoveFriend = async (req, res) => {
  const { user, friend } = req.body;
  if (!user || !friend) {
    return res.status(400).json({ msg: "Please enter a user and a friend" });
  }
  const foundUser = await User.findOne({ username: user }).exec();
  const foundFriend = await User.findOne({ username: friend }).exec();
  if (!foundUser || !foundFriend) {
    return res.status(400).json("The user or friend does not exist");
  }
  try {
    foundUser.friends = foundUser.friends.filter(
      (f) => !f.equals(foundFriend._id)
    );
    await foundUser.save();
    res.json({ msg: "Successfully removed friend" });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Failed to remove friend");
  }
};
module.exports = { handleAddFriend, handleRemoveFriend };
