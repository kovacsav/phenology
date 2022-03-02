const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

// timestamps: https://mongoosejs.com/docs/guide.html#timestamps
const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: 1,
    },
    accessToken: {
      type: String,
      required: false,
    },
    confirmationCode: { 
      type: String, 
      unique: true },
  },
  {
    timeStamps: true,
  }
);

UserSchema.plugin(idValidator);

module.exports = mongoose.model("User", UserSchema);

/*
export class User {
  _id: string = '';
  firstName?: string = '';
  lastName?: string = '';
  email?: string = '';
  active?: boolean = true;
  password: string = '';
  accessToken?: string = '';
  role?: string = '';
}
*/
