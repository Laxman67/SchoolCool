import staffModel from '../models/staffModel.js';
import studentModel from '../models/studentModel.js';
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
  if (!isEmail(email)) {
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
  res.status(200).json({
    success: true,
    message: 'All staff',
  });
};

// 3. Get Staff by Id
export const getStaffById = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'get staff by id ',
  });
};

// 4. Delete staff by id
export const deleteStaff = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Delete Staff',
  });
};

// 5. Updat Staff by id
export const updateStaff = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Update Staff',
  });
};
