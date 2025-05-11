const jwt = require('jsonwebtoken');
require('dotenv').config(); // Make sure this is at the top

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("auth header", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("extracted token", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(process.env.JWT_SECRET);
    console.log("Decoded user:", decoded); // Log the decoded user information
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
