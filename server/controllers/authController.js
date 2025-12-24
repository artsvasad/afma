import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js'; // Import centralized secret

// 1. Register
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if admin already exists
    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ error: "Admin already exists" });

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

    // Generate Token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });
    
    console.log(`Login successful for: ${username}`);
    res.json({ token, username: admin.username });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};