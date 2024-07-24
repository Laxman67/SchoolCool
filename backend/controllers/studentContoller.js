import studentModel from '../models/studentModel.js';
import validator from 'validator';
import responseMessage from '../utility/ErrorMessage.js';

export const addStudents = async (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    gender,
    address,
    email,
    phone,
    enrollmentStatus,
    academicHistory,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !gender ||
    !dob ||
    !address ||
    !email ||
    !phone ||
    !enrollmentStatus ||
    !academicHistory
  ) {
    res.status(404).json({ success: false, message: 'Provide all fields' });
  }
  // Check for Valid Email
  if (!validator.isEmail(email)) {
    return res.status(404).json({
      success: false,
      message: 'Please Enter a Valid Email',
    });
  }

  // Check for Exisiting user

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
    address,
    email,
    gender,
    phone,
    enrollmentStatus,
    academicHistory,
  });

  await newStudent
    .save()
    .then(() => {
      res.status(201).json({ success: true, message: ' Student Added ' });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: 'Error Occured while Adding',
        errorMsg: err,
      });
    });
};
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
    Students: result,
  });
};
export const deleteStudent = async (req, res) => {
  const { email } = req.body;

  const result = await studentModel.findOne({ email });
  console.log(result);

  if (result) {
    await studentModel.findOneAndDelete({ email });
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
