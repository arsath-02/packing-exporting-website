import express from 'express';
import { 
  saveAttendance, 
  getAttendanceByDate, 
  getAttendanceStatsByDepartment 
} from '../controllers/attendanceController.js';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes


// Route to save attendance records
router.post('/save', saveAttendance);

// Route to get attendance records for a specific date
router.get('/:date', getAttendanceByDate);

// Route to get attendance statistics by department
router.get('/stats/department', getAttendanceStatsByDepartment);

export default router;