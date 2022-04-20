const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

// timestamps: https://mongoosejs.com/docs/guide.html#timestamps

const ObservationSchema = mongoose.Schema(
  {
    date: String,
    location: String,
    gps: {
      type: String,
      required: false,
    },
    plant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    phase: String,
    photo: {
      type: [String],
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timeStamps: true,
  }
);

ObservationSchema.plugin(idValidator);

module.exports = mongoose.model("deletedObservation", ObservationSchema);

