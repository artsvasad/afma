import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js'; // Import centralized secret

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    // console.log("Access Denied: No Token"); // Optional logging
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error("Token Verification Failed");
    res.status(400).json({ error: "Invalid Token" });
  }
};