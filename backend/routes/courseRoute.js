import express from 'express';
import multer from 'multer';
import {
  allCourse,
  addCourse,
  deleteCourse,
  updateCourse,
} from '../controllers/courseContoller.js';

// Configure the image storage engine
const storage = multer.diskStorage({
  destination: 'uploads/courses',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const courseRouter = express.Router();

// *****CRUD Operation ********

// Define the route for  courses

// 1. Add course
courseRouter.post('/add', upload.single('courseBanner'), addCourse);
// 2. List All course
courseRouter.get('/list', allCourse);
// 3. Delete course
courseRouter.delete('/delete', deleteCourse);
// 4. Update course
courseRouter.patch('/update/:id', updateCourse);

export default courseRouter;
