const mongoose = require('mongoose');
const idValidator = require("mongoose-id-validator");

// timestamps: https://mongoosejs.com/docs/guide.html#timestamps
const PlantSchema = mongoose.Schema({
  name: String,
  latin: String,
  phase: [String],
  image: [String],
  category: String,
  description:[String],
  observations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Observation',
      required: false
    }
  ]
}, {
    timeStamps: true
});

PlantSchema.plugin(idValidator);

module.exports = mongoose.model('Plant', PlantSchema);


/* export class Plant {
  id: number = 0;
  name: string ='';
  latin: string = '';
  phase: string[] = [];
  image: string ='';
  category: string = '';
} */