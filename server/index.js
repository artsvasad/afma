import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import marksRoutes from './routes/marksRoutes.js'; // Note the .js extension
import dotenv from 'dotenv';
const app = express();
dotenv.config()

const MONGO_URI = process.env.MONGO_URI
const CLIENT_URI=process.env.CLIENT_URI
// Middleware
app.use(cors(CLIENT_URI));
app.use(express.json({ limit: '50mb' }));

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('DB Error:', err));

// Routes
app.use('/api', marksRoutes);

app.get('/', (req, res)=>{
  return res.status(200).send("Hi")
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));