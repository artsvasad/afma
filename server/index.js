import 'dotenv/config'; // MUST BE FIRST
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGO_URI, CLIENT_URI } from './config.js'; // Import from config

// Import Routes & Controllers
import marksRoutes from './routes/marksRoutes.js';
import { registerAdmin, loginAdmin } from './controllers/authController.js';

const app = express();

// Middleware
app.use(cors({ origin: CLIENT_URI })); // Restrict CORS to your client
app.use(express.json({ limit: '50mb' }));

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('DB Error:', err));

// Auth Routes
app.post('/api/auth/register', registerAdmin);
app.post('/api/auth/login', loginAdmin);

// Protected Data Routes
app.use('/api', marksRoutes);

// Simple Health Check
app.get('/', (req, res) => {
  res.status(200).send("Server is running...");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));