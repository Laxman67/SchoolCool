import staffModel from '../models/staffModel.js';
import validator from 'validator';
import fs from 'fs';
import isEmail from 'validator/lib/isEmail.js';

// 1. Add Staf
export const addStaff = async (req, res) => {
  // const image = req.file.filename ? req.file.name : 'SSSS.jpg';
  const image = 'SSSS.jpg';
  const {
    firstName,
    lastName,
    dob,
    email,
    phone,
    gender,
    address,
    employmentStatus,
    role,
  } = req.body;

  // Check for Each Fields
  if (
    !firstName ||
    !lastName ||
    !dob ||
    !phone ||
    !gender ||
    !address ||
    !employmentStatus ||
    !role
  ) {
    return res.status(403).json({
      success: false,
      message: 'All fields Required',
    });
  }
  // Check for Email validation
  if (!validator.isEmail(email)) {
    return res.status(403).json({
      success: false,
      message: 'Valid Email id reqired',
    });
  }

  const emailExist = await staffModel.findOne({ email });

  if (emailExist) {
    return res.status(403).json({
      success: false,
      message: ' Email Already Exists ',
    });
  }

  try {
    let newStaff = new staffModel({
      firstName,
      lastName,
      dob,
      email,
      phone,
      gender,
      address,
      employmentStatus,
      role,
      image,
    });

    await newStaff.save();
    res.status(200).json({
      success: true,
      message: 'Staff Added Success',
      newStaff,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Error Occured while adding Staff',
      errorMsg: error,
    });
  }
};

// 2.  It will return all staff
export const allStaff = async (req, res) => {

  try {
    const staffs = await staffModel.find()
    console.log(staffs);
    if (!staffs.length > 0) {
      return res.status(404).json({
        success: false,
        message: 'Staff Not Found',
        errorMsg: error,
      });
    }

    // Return if found
    return res.status(200).json({
      success: true,
      message: 'Staff Found !',
      data: staffs
    });


  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Error !',
      error: error
    });
  }

};

// 3. Get Staff by Id
export const getStaffById = async (req, res) => {
  const { staffId } = req.params

  try {
    const staff = await staffModel.findOne({ staffId })
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Not Recors with this id Found ',

      });
    }

    res.status(200).json({
      success: true,
      message: 'Staff Founded ',
      data: staff
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Error Occured',
      errorMsg: error

    });
  }


};

// 4. Delete staff by id
export const deleteStaff = async (req, res) => {
  const { staffId } = req.params

  try {
    const staff = await staffModel.findOne({ staffId })
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Not Found ',
      });
    }

    let response = await staffModel.deleteOne({ staffId })
    res.status(200).json({
      success: true,
      message: 'Deleted',
      data: response
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Error Occured',
    });
  }

};

// 5. Updat Staff by id
export const updateStaff = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Update Staff',
  });
};
