import express from 'express';
import multer from 'multer';
import {
  allCourse,
  addCourse,
  deleteCourse,
  updateCourse,
  getCourseById
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
courseRouter.post('/', upload.single('courseBanner'), addCourse);


// 2. List All course
courseRouter.get('/' , allCourse);
// 2.1 get  course by id
courseRouter.get('/:courseId', getCourseById);

// 3. Delete course
courseRouter.delete('/:courseId', deleteCourse);
// 4. Update course
courseRouter.patch('/:courseId', updateCourse);

export default courseRouter;
