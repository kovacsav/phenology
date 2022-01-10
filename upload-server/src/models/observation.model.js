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
  },
  {
    timeStamps: true,
  }
);

ObservationSchema.plugin(idValidator);

module.exports = mongoose.model("Observation", ObservationSchema);

/* 
export class Observation {
  id: number = 0;
  date: string | null= '';
  location: string = '';
  gps?: string = '';
  plant: Plant = new Plant();
  phase: string = '';
  photo?: string = '';
  note?: string = '';
}
*/
