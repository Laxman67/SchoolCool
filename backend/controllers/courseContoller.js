import courseModel from '../models/courseModel.js';
import fs from 'fs';

// *******************************Utility Fucntion**********************
const getCourseId = async (courseId) => {
  let course = await courseModel.findOne({ courseId });
  return course;
};
// *******************************Utility Fucntion**********************

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
  console.log('allCourse Conroller');
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

export const getCourseById = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    // const course = await courseModel.findOne({courseId}); // OR This can be Implement but we've to look for efficiency
    const course = await getCourseId(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteCourse = async (req, res) => {
  const courseId = req.params.courseId;

  const result = await getCourseId(courseId);

  if (result) {
    await courseModel.findOneAndDelete({ courseId });

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

export const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const toUpdate = req.body;

  try {
    const filter = { courseId: courseId.toString() };

    let updateQuery = { $set: toUpdate }; // Define Query to Perform

    let course = await courseModel.findOneAndUpdate(filter, updateQuery, {
      new: true,
    });

    if (!course) {
      res.status(404).json({ success: false, message: 'Course Not Found !' });
    }

    return res
      .status(201)
      .json({ success: true, message: 'Course updated successfully' });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: 'Error Occured', error: err });
  }
};
