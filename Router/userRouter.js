// external import
const express = require("express");

// internal import

const {
  createUser,
  loginUser,
  getAllUser,
  myDetails,
} = require("../Controller/userController");
const authVerification = require("../Middleware/authVarification");
const { authorizeRoles } = require("../Middleware/roleMiddleware");

// creating router
const router = express.Router();

router.route("/create-user").post(createUser);
router.route("/login-user").post(loginUser);
router
  .route("/all-user")
  .get(authVerification, authorizeRoles("Admin"), getAllUser);

// get login user details
router.route("/myprofile").get(authVerification, myDetails);

module.exports = router;
