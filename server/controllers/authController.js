import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

// 1. Register (Run this once via Postman to create your admin, then delete/hide this route)
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    res.json({ message: "Admin created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Login
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    
    if (!admin) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Create Token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};