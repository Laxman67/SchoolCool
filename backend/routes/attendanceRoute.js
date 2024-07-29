import express from 'express';
import {
  addAttendanceRecord,
  getAttendanceRecord,
  deleteAttendanceRecord,
  updateAttendanceRecord,
  getAttendanceRecordById,
} from '../controllers/attendanceController.js';
const attendanceRouter = express.Router();

attendanceRouter.post('/', addAttendanceRecord);
attendanceRouter.get('/:id', getAttendanceRecordById);
attendanceRouter.get('/', getAttendanceRecord);
attendanceRouter.delete('/:id', deleteAttendanceRecord);
attendanceRouter.patch('/:id', updateAttendanceRecord);

export default attendanceRouter;
