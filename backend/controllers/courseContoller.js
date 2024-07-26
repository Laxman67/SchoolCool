import courseModel from '../models/courseModel.js';
import fs from 'fs';

// Add Course
export const addCourse = async (req, res) => {
  const courseBanner = req.file ? req.file.filename : null;

  const { courseName, description, classTimings, roomAssignments, instructor } =
    req.body;

  // All fields are checking
  if (
    !courseName ||
    !description ||
    !classTimings ||
    !roomAssignments ||
    !instructor ||
    !courseBanner
  ) {
    return res.status(404).json({
      success: false,
      message: 'All fields are mandatory',
    });
  }

  let newCourse = new courseModel({
    courseName,
    courseBanner,
    description,
    classTimings,
    roomAssignments,
    instructor,
  });

  try {
    await newCourse.save();
    return res.status(404).json({
      success: true,
      message: 'Course Added Successfully !',
    });
  } catch (error) {
    return res.status(404).json({
      success: true,
      message: 'Error Cooured while Adding Course !',
      errorMsg: error,
    });
  }
};

export const allCourse = async (req, res) => {
  try {
    const courses = await courseModel.find({});
    if (courses.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Course found !',
        courses: courses,
      });
    }
    return res.status(404).json({
      success: false,
      message: 'No Course Found !',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Error Occured While Fetching All Courses !',
      errorMsg: error,
    });
  }
};

export const deleteCourse = async (req, res) => {
  const id = req.body.id || req.query.id;

  const result = await courseModel.findOne({ _id: id });

  if (result) {
    await courseModel.findOneAndDelete({ _id: id });
    fs.unlink(`uploads/courses/${result.courseBanner}`, (err) => {
      if (err) {
        console.log(`Error => ${err}`);
      } else {
        console.log(`uploads/courses/${result.courseBanner} was deleted`);
      }
    });
    return res
      .status(201)
      .json({ message: ' course Deleted ', acknowlege: result });
  }

  return res.status(403).json({ message: 'Course Not Exists ' });
};

export const updateCourse = async (req, res) => {};
