const User = require('../../models/user.model');

exports.create = data => {
    const user = new User(data);
    return user.save();
};

exports.findAll = () => User.find().populate();

exports.findOne = id => User.findById(id).populate();

exports.update = (id, updateData) => User.findByIdAndUpdate(id, updateData, {new: true});

exports.delete = id => User.findByIdAndRemove(id);
