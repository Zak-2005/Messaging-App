const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(authHeader)
  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
        console.log("err")
        return res.sendStatus(403);
    }
    console.log(decoded.UserInfo.username)
    req.user = decoded.UserInfo.username;
    console.log(req.user)
    next();
  });
};

module.exports = verifyJWT;
