const res = require('express/lib/response');
const User = require('../../models/user.model');

exports.create = data => {
    const user = new User(data);
    return user.save();
};


exports.findAll = () => User.find().populate();

exports.findOne = id => User.findById(id).populate();

exports.findOneParam = param => User.findOne(param);

exports.update = (id, updateData) => User.findByIdAndUpdate(id, updateData, {new: true});

exports.delete = id => User.findByIdAndRemove(id);

exports.findOneByConfirmationcode = confirmationCode => {
  console.log("find one start")  
  User.findOne({confirmationCode: confirmationCode})
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.active = true;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
      return res.status(201);
    })
    .catch((e) => console.log("error", e));;
};