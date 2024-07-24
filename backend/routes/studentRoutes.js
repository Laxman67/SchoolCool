import express from 'express';
import {
  addStudents,
  allStudents,
  deleteStudent,
  updateStudent,
} from '../controllers/studentContoller.js';

const studentRouter = express.Router();

studentRouter.post('/add', addStudents);
studentRouter.get('/list', allStudents);
studentRouter.delete('/delete', deleteStudent);
studentRouter.patch('/update/:id', updateStudent);
export default studentRouter;
