// ez a modell azért kell, mert amikor visszakérjük
// megfigyelt adatokat az adatbázisból, akkor
// az ID-k alapján hozzá kell rakjuk az observation modellhez
// a plant name-et és a user name-et 

const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

// timestamps: https://mongoosejs.com/docs/guide.html#timestamps
const ObservatedDataSchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    gps: {
      type: String,
      required: false,
    },
    plantID: {
      type: String,
      required: true,
    },
    phase: {
      type: String,
      required: true,
    },
    photo: {
      type: [String],
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    userID: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    plant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timeStamps: true,
  }  
);

ObservatedDataSchema.plugin(idValidator);

module.exports = mongoose.model("Observation", ObservatedDataSchema);
