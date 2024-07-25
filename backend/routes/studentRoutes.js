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
  updateStudent,
} from '../controllers/studentContoller.js';

const studentRouter = express.Router();

// *****CRUD Operation ********

// Define the route for adding Student with image 
// 1. Add Student 
studentRouter.post('/add', upload.single('image'), addStudents);
// 2. List All Student 
studentRouter.get('/list', allStudents);
// 3. Delete Student 
studentRouter.delete('/delete', deleteStudent);
// 4. Update Student 
studentRouter.patch('/update/:id', updateStudent);

export default studentRouter;
