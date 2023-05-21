const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      default: false,
    },
    fanRPM: {
      type: Number,
      default: 0,
    },
    temperature: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const DeviceModel = mongoose.model("Device", deviceSchema);

module.exports = DeviceModel;
