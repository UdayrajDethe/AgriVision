const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // get token from header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // store user data in request
    req.user = verified;

    next(); // go to next function

  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;