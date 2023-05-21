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
    phone,
    password,
  });
  let userData = await newUser.save();

  res.status(201).json({
    success: true,
    userData,
    message: "User Create Successfully!!",
  });
});
