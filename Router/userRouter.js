// external import
const express = require("express");

// internal import

const { createUser, loginUser } = require("../Controller/userController");

// creating router
const router = express.Router();

router.route("/create-user").post(createUser);
router.route("/login-user").post(loginUser);

module.exports = router;
