// external import
const express = require("express");

const authVerification = require("../Middleware/authVarification");
const { authorizeRoles } = require("../Middleware/roleMiddleware");
const {
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../Controller/roomController");

// internal import

// creating router
const router = express.Router();

router
  .route("/create-room")
  .post(authVerification, authorizeRoles("Admin"), createRoom);
router
  .route("/update-room/:id")
  .put(authVerification, authorizeRoles("Admin"), updateRoom);
router
  .route("/update-room/:id")
  .delete(authVerification, authorizeRoles("Admin"), deleteRoom);

module.exports = router;
