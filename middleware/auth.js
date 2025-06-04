// auth.js

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ message: "Access denied" });

  try {
    // IMPORTANT: Using JWT_PRIVATE_KEY as per your .env configuration
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY); // <--- CHANGED HERE
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};