const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");
const bcrypt = require("bcrypt");
const bcryptSalt = process.env.BCRYPT_SALT;

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
      default: false,
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

// https://blog.logrocket.com/implementing-a-secure-password-reset-in-node-js/
// Before the password is saved,
// we use the pre-save MongoDB hook to hash the password

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err, false);
    }
    return cb(null, isMatch);
  });
};

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
