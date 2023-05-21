const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    devices: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    renter: {
      type: mongoose.Schema.Types.ObjectId,

      default: null,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const RoomModel = mongoose.model("Room", roomSchema);

module.exports = RoomModel;
