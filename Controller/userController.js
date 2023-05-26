// internal import
const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utility/ErrorHandler");

const jwtHandle = require("../Utility/createToken");
const Errorhandeler = require("../Utility/ErrorHandler");
const UserModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");

// const crypto = require("crypto");

// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandeler("Please fill the value properly", 400));
  }

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // check password

  if (user.password !== password) {
    return next(new ErrorHandler("Authentication Failed!", 401));
  }

  let token;
  if (user.password === password) {
    token = await jwtHandle(user.email, user._id);
  }

  res.status(200).json({
    success: true,
    user,
    access_token: token,
    message: "Login Successfully!!",
  });
});

// create user
exports.createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new Errorhandeler("Please fill the value properly", 400));
  }

  const user = await UserModel.findOne({ email: email });
  if (user) {
    return next(new ErrorHandler("User already axist!", 404));
  }

  const newUser = new UserModel({
    name,
    email,

    password,
  });
  let userData = await newUser.save();

  let token;
  if (userData) {
    token = await jwtHandle(userData?.email, userData?._id);
  }
  res.status(201).json({
    success: true,
    userData,
    access_token: token,
    message: "User Create Successfully!!",
  });
});
// create user
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.find({ role: "renter" });
  if (user.length === 0) {
    return next(new ErrorHandler("User already axist!", 404));
  }

  res.status(200).json({
    success: true,
    user,
    message: "User Get Successfully!!",
  });
});
// get login user details
exports.myDetails = catchAsyncError(async (req, res, next) => {
  const id = req.userId;
  const user = await UserModel.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
