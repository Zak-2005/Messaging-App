const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  console.log(req.cookies);
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
        console.log(foundUser.username)
        console.log(decoded.username)
      console.log("workingcorrectly");
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
