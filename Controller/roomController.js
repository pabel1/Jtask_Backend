// internal import
const catchAsyncError = require("../Middleware/catchAsyncError");
const RoomModel = require("../Model/roomModel");

const ErrorHandler = require("../Utility/ErrorHandler");

const Errorhandeler = require("../Utility/ErrorHandler");

// create devices
exports.createRoom = catchAsyncError(async (req, res, next) => {
  const { roomNumber, devices, renterEmail } = req.body;

  if (!roomNumber) {
    return next(new Errorhandeler("Please fill the value properly", 400));
  }

  const room = await RoomModel.findOne({ roomNumber: roomNumber });
  if (room) {
    return next(new ErrorHandler("this Room  already axist!", 404));
  }

  let newRoom = await RoomModel.create({
    roomNumber,
    devices,
    renterEmail,
  });

  res.status(201).json({
    success: true,
    newRoom,
    message: "Room Create Successfully!!",
  });
});

// update Room
exports.updateRoom = catchAsyncError(async (req, res, next) => {
  const roomNumber = req.params.roomId;

  if (!req.body) {
    return next(new Errorhandeler("Please fill the value properly", 400));
  }

  const room = await RoomModel.findOne({ roomNumber: roomNumber });
  if (!room) {
    return next(new ErrorHandler("this Room  not axist!", 404));
  }

  let newRoom = await RoomModel.findOneAndUpdate(
    { roomNumber: roomNumber },
    req.body,
    { new: true }
  );

  res.status(201).json({
    success: true,
    newRoom,
    message: "Room updated Successfully!!",
  });
});
// update Room
exports.deleteRoom = catchAsyncError(async (req, res, next) => {
  const roomNumber = req.params.roomId;

  const room = await RoomModel.findOne({ roomNumber: roomNumber });
  if (!room) {
    return next(new ErrorHandler("this Room  not axist!", 404));
  }

  await room.remove();

  res.status(201).json({
    success: true,

    message: "Room deleted Successfully!!",
  });
});

// get all room
exports.getAllRoom = catchAsyncError(async (req, res, next) => {
  const room = await RoomModel.aggregate([{ $sort: { createdAt: -1 } }]);
  res.status(200).json({
    success: true,
    room,
  });
});
