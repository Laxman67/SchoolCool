import express from 'express';
import multer from 'multer';

const staffRouter = express.Router();
import {
  addStaff,
  getStaffById,
  allStaff,
  updateStaff,
  deleteStaff,
} from '../controllers/StaffController.js';

// ********START******************************MULTER CONFIGURATION*******
const storage = multer.diskStorage({
  destination: 'uploads/courses',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
// ********END******************************MULTER CONFIGURATION*******

// Routes
staffRouter.post('/', upload.single('image'), addStaff);
staffRouter.get('/', allStaff);
staffRouter.get('/:id', getStaffById);
staffRouter.delete('/:id', deleteStaff);
staffRouter.patch('/:id', updateStaff);

export default staffRouter;
