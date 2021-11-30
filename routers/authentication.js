const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "forbidden" });
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const parsedToken = jwt.verify(token, secret);
      req.token = parsedToken;
      // console.log(req.headers.authorization.split(" ")[1]);
      next();
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = authentication;
