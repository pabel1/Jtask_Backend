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
        diviceName: {
          type: String,
          require: true,
        },
      },
    ],
    // renter: {
    //   type: mongoose.Schema.Types.ObjectId,

    //   default: null,
    // },
    renter: {
      type: String,
      require: true,
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
