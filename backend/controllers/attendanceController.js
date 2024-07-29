import attendanceModel from '../models/attendanceModel.js';
import attendance from '../models/attendanceModel.js';

export const addAttendanceRecord = async (req, res) => {
  const data = req.body;
  try {
    if (!data.records && !data.createdBy) {
      return res.status(403).json({
        success: false,
        message: 'All Field Required',
      });
    }
    if (!data.records.length > 0) {
      return res.status(403).json({
        success: false,
        message: 'Please Provide data',
      });
    }

    const newAttendance = new attendanceModel({
      ...data,
    });
    await newAttendance.save();

    res.status(201).json({
      success: true,
      message: 'New Attendance Record Added',
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Please Provide data',
    });
  }
};
export const getAttendanceRecord = async (req, res) => {
  try {
    const records = await attendanceModel.find({});
    if (!records.length > 0) {
      return res.status(404).json({
        success: false,
        message: 'Not Found',
      });
    }
    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      errorMsg: error,
    });
  }
};
export const getAttendanceRecordById = async (req, res) => {
  const _id = req.params.id;

  try {
    const report = await attendanceModel.findById({ _id });
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Not Found',
        errorMsg: error,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Data Fetched',
      data: report,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Error Occured',
      errorMsg: error,
    });
  }
};
export const deleteAttendanceRecord = async (req, res) => {
  const _id = req.params.id;

  try {
    const report = await attendanceModel.findByIdAndDelete({ _id: _id });
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Not Found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Data Deleted',
      data: report,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Error Occured',
      errorMsg: error,
    });
  }
};
export const updateAttendanceRecord = async (req, res) => {
  const _id = req.params.id;
  const toUpdate = req.body;
  try {
    const filter = { _id };

    let updateQuery = { $set: toUpdate }; // Define Query to Perform

    let report = await attendanceModel.findOneAndUpdate(filter, updateQuery, {
      new: true,
    });

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: 'record Not Found !' });
    }

    res
      .status(201)
      .json({ success: true, message: 'record updated successfully' });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: 'Error Occured', error: err });
  }
};
