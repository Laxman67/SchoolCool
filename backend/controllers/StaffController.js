import staffModel from '../models/staffModel.js';
import fs from 'fs';

// 1. Add Staf
export const addStaff = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'add staff',
  });
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
