var jwt = require("jsonwebtoken");

const JWT_SECRET = "mySecretKey";

const fetchUser = (req, res, next) => {
  const token = req.header("authToken");
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};
module.exports = fetchUser;
