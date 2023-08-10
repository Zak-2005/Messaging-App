const User = require("../models/User");
const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken}).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    return res.sendStatus(204);
  }
  foundUser.refreshToken = "";
  await foundUser.save();
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure:true,
    sameSite:'none'
  });
   res.sendStatus(204);
};

module.exports = {handleLogout}
