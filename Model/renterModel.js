const mongoose = require("mongoose");

const renterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accessRooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

const RenterModel = mongoose.model("Renter", renterSchema);

module.exports = RenterModel;
