import express from 'express';
import multer from 'multer';

// Configure the image storage engine
const storage = multer.diskStorage({
  destination: 'uploads/images',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

import {
  addStudents,
  allStudents,
  deleteStudent,
  getById,
  updateStudent,
} from '../controllers/studentContoller.js';

const studentRouter = express.Router();

// *****CRUD Operation ********

// Define the route for adding Student with image
// 1. Add Student
studentRouter.post('/add', upload.single('image'), addStudents);
// 5 . get by id
studentRouter.get('/:id', getById);
// 2. List All Student
studentRouter.get('/', allStudents);
// 3. Delete Student
studentRouter.delete('/', deleteStudent);
// 4. Update Student
studentRouter.patch('/:id', updateStudent);

export default studentRouter;
