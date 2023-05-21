// internal import
const catchAsyncError = require("../Middleware/catchAsyncError");
const DeviceModel = require("../Model/devicesModel");
const ErrorHandler = require("../Utility/ErrorHandler");

const Errorhandeler = require("../Utility/ErrorHandler");

// create devices
exports.createDevices = catchAsyncError(async (req, res, next) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return next(new Errorhandeler("Please fill the value properly", 400));
  }

  const device = await DeviceModel.findOne({ name: name });
  if (device) {
    return next(new ErrorHandler("this device already axist!", 404));
  }

  const newDevice = new DeviceModel({
    name,
    type,
  });
  let deviceData = await newDevice.save();

  res.status(201).json({
    success: true,
    deviceData,
    message: "Device Create Successfully!!",
  });
});
// get all  devices
exports.getAllDevices = catchAsyncError(async (req, res, next) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return next(new Errorhandeler("Please fill the value properly", 400));
  }

  const device = await DeviceModel.findOne({ name: name });
  if (device) {
    return next(new ErrorHandler("this device already axist!", 404));
  }

  const newDevice = new DeviceModel({
    name,
    type,
  });
  let deviceData = await newDevice.save();

  res.status(201).json({
    success: true,
    deviceData,
    message: "Device Create Successfully!!",
  });
});
// update   devices
exports.updateDevices = catchAsyncError(async (req, res, next) => {
  const deviceId = req.params.id;

  const device = await DeviceModel.findById(deviceId);
  if (!device) {
    return next(new ErrorHandler("this device not  axist!", 404));
  }

  const updatedDevice = await DeviceModel.findByIdAndUpdate(
    deviceId,
    req.body,
    { new: true }
  );

  res.status(201).json({
    success: true,
    updatedDevice,
    message: "Device updated Successfully!!",
  });
});
// delete   devices
exports.deleteDevices = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  const device = await DeviceModel.findById(id);
  if (!device) {
    return next(new ErrorHandler("this device not  axist!", 404));
  }
  await device.remove();

  res.status(201).json({
    success: true,
    message: "Device Delete Successfully!!",
  });
});
