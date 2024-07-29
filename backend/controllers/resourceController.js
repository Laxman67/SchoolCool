import resourceModel from '../models/resourceModel.js';

export const addResource = async (req, res) => {
  const { resourceName, type, availability, location } = req.body;

  // Getting All Possible Required Fields
  if (!resourceName || !type || !availability || !location) {
    return res
      .status(404)
      .json({ success: false, message: 'Provide Mandatory Details' });
  }

  try {
    const newResource = new resourceModel({
      resourceName,
      type,
      availability,
      location,
    });

    let result = await newResource.save();

    res
      .status(201)
      .json({ success: true, message: ' Resources Added', data: result });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'Error Occured', errorMsg: error });
  }
};
export const getResource = async (req, res) => {
  try {
    let result = await resourceModel.find(
      {},
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );

    if (!result.length > 0) {
      return res.status(404).json({ success: false, message: 'Not Found' });
    }

    // If Success
    res
      .status(200)
      .json({ success: true, message: 'Data Fetched', data: result });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: 'Error Occured', errorMsg: error });
  }
};
export const getByIdResource = async (req, res) => {
  const _id = req.params.id;

  if (!_id) {
    return res.status(404).json({
      success: false,
      message: 'Please Provide Id',
    });
  }

  const result = await resourceModel.findById({ _id });

  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'Not Record found with this _id',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Fetched',
    data: result,
  });
  try {
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Error Occured',
      errorMsg: error,
    });
  }
};
export const deleteResource = async (req, res) => {
  const _id = req.params.id;
  if (!_id) {
    return res.status(404).json({
      success: false,
      message: 'Please Provide Id',
    });
  }

  try {
    const result = await resourceModel.findByIdAndDelete({ _id });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Not Record Found to delete',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Record Deleted !',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Error Occured',
      errorMsg: error,
    });
  }
};
export const updateResource = async (req, res) => {
  const _id = req.params.id;
  const toUpdate = req.body;
  if (!_id) {
    return res.status(404).json({
      success: false,
      message: 'Please Provide Id',
    });
  }
  try {
    const filter = { _id };

    let updateQuery = { $set: toUpdate }; // Define Query to Perform

    let result = await resourceModel.findOneAndUpdate(filter, updateQuery, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: 'Record Updated !',
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Error Occured',
      errorMsg: error,
    });
  }
};
