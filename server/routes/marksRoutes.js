import express from 'express';
import { getStudentsByClass, updateBulkMarks, createStudent, deleteStudent } from '../controllers/marksController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Import Middleware

const router = express.Router();

// Public Routes (if any) - None for now
// Protected Routes
router.get('/students/:className', verifyToken, getStudentsByClass); // LOCKED
router.post('/update-marks', verifyToken, updateBulkMarks);          // LOCKED
router.post('/add-student', verifyToken, createStudent);             // LOCKED
router.delete('/delete-student/:id', verifyToken, deleteStudent);    // LOCKED

export default router;