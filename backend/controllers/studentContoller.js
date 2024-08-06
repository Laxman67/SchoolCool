import studentModel from '../models/studentModel.js';
import fs from 'fs';
import validator from 'validator';
import multer from 'multer';

// Add Student
export const addStudents = async (req, res) => {
  const image = req.file.filename; // workig well in thunder client but not in actual
  const {
    firstName,
    lastName,
    dob,
    gender,
    street,
    city,
    state,
    postalCode,
    email,
    phone,
    enrollmentStatus,
    course,
    year,
    grade,
  } = req.body;

  // for Checking the incomming req.body
  // console.log({
  //   firstName,
  //   image,
  //   lastName,
  //   dob,
  //   address: {
  //     street,
  //     city,
  //     state,
  //     postalCode,
  //   },
  //   email,
  //   gender,
  //   phone,
  //   enrollmentStatus,
  //   academicHistory: {
  //     course,
  //     year,
  //     grade,
  //   },
  //   image, // Include the image field
  // });

  if (
    !firstName ||
    !lastName ||
    !gender ||
    !dob ||
    !email ||
    !phone ||
    !enrollmentStatus
  ) {
    return res
      .status(404)
      .json({ success: false, message: 'Provide all fields' });
  }

  // Check for Valid Email
  if (!validator.isEmail(email)) {
    return res.status(404).json({
      success: false,
      message: 'Please Enter a Valid Email',
    });
  }

  // Check for Existing user
  const student = await studentModel.findOne({ email });

  if (student) {
    return res.status(404).json({
      success: false,
      message: 'Already Exists with this Email ID',
    });
  }

  const newStudent = new studentModel({
    firstName,
    lastName,
    dob,
    address: {
      street,
      city,
      state,
      postalCode,
    },
    email,
    gender,
    phone,
    enrollmentStatus,
    academicHistory: {
      course,
      year,
      grade,
    },
    image, // Include the image field
  });

  // TODO
  console.log(newStudent);
  await newStudent
    .save()
    .then(() => {
      res.status(201).json({ success: true, message: 'Student Added' });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: 'Error Occurred while Adding',
        errorMsg: err,
      });
    });
};

// All Student
export const allStudents = async (req, res) => {
  const result = await studentModel.find();

  if (!result) {
    res.status(404).json({
      success: false,
      message: 'Error Occured while Fetching',
      errorMsg: err,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Fetched Details',
    result,
  });
};

export const getById = async (req, res) => {
  const _id = req.params.id;

  try {
    let student = await studentModel.findOne({ _id });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: 'Student Not Found !' });
    }

    res.status(201).json({
      success: true,
      message: 'Student Found successfully',
      data: student,
    });
  } catch (err) {
    return res.status(201).json({
      success: false,
      message: 'Error Occured',
      errorMsg: err,
    });
  }
};
export const deleteStudent = async (req, res) => {
  const { email } = req.body;

  const result = await studentModel.findOne({ email });

  if (result) {
    await studentModel.findOneAndDelete({ email });
    fs.unlink(`uploads/images/${result.image}`, (err) => {
      if (err) {
        console.log(`Error => ${err}`);
      } else {
        console.log('path/file.txt was deleted');
      }
    });
    return res
      .status(201)
      .json({ message: ' Student Deleted ', acknowlege: result });
  }

  return res.status(403).json({ message: 'Student Not Exists ' });
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const toUpdate = req.body;

  try {
    let updateQuery = { $set: toUpdate }; // Define Query to Perform

    let student = await studentModel.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!student) {
      res.status(404).json({ success: false, message: 'Student Not Found !' });
    }

    return res
      .status(201)
      .json({ success: true, message: 'Student updated successfully' });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: 'Error Occured', error: err });
  }
};
