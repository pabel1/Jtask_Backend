// external import
const express = require("express");

const authVerification = require("../Middleware/authVarification");
const { authorizeRoles } = require("../Middleware/roleMiddleware");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRoom,
} = require("../Controller/roomController");

// internal import

// creating router
const router = express.Router();

router
  .route("/create-room")
  .post(authVerification, authorizeRoles("Admin"), createRoom);
router
  .route("/update-room/:roomId")
  .put(authVerification, authorizeRoles("Admin"), updateRoom);
router
  .route("/update-room/:roomId")
  .delete(authVerification, authorizeRoles("Admin"), deleteRoom);
router.route("/get-all-room").get(getAllRoom);

module.exports = router;
