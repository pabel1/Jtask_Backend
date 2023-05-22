// external import
const express = require("express");
const {
  createDevices,
  updateDevices,
  deleteDevices,
  getAllDevices,
} = require("../Controller/devicesController");
const authVerification = require("../Middleware/authVarification");
const { authorizeRoles } = require("../Middleware/roleMiddleware");

// internal import

// creating router
const router = express.Router();

router
  .route("/create-device")
  .post(authVerification, authorizeRoles("Admin"), createDevices);
router
  .route("/update-device/:id")
  .put(authVerification, authorizeRoles("Admin"), updateDevices);
router
  .route("/update-device/:id")
  .delete(authVerification, authorizeRoles("Admin"), deleteDevices);

router.route("/get-all-device").get(getAllDevices);

module.exports = router;
