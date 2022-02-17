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

module.exports = mongoose.model("Observation", ObservationSchema);

/*
const ObservationSchema = mongoose.Schema(
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
  },
  {
    timeStamps: true,
  }  
);
*/

/*
export class Observation {
  // _id: string = '';
  date: string | null = '';
  // date: string | null= new Date().toLocaleDateString('hu-HU');
  location: string = 'Miskolc';
  gps?: string = '';
  plantID: string = '';
  phase: string = '';
  photo?: string[] = [];
  note?: string = '';
  userID: string = '';
}
*/

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

/*
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
      type: String,
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
  },
  {
    timeStamps: true,
  }
);
*/

/*
const ObservationSchema = mongoose.Schema(
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
      type: String,
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
  },
  {
    timeStamps: true,
  }
);
*/