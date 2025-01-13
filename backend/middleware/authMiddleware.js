const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blackListSchema");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  // Check if the token is blacklisted
  const isBlacklisted = await Blacklist.findOne({ token });
  if (isBlacklisted) {
    return res
      .status(403)
      .json({ message: "Token is invalid. Please log in again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
