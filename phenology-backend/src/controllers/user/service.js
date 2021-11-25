const User = require('../../models/user.model');

module.exports.create = data => {
    const entity = new User(data);
    return entity.save();
};

module.exports.findAll = () => User.find().populate();

module.exports.findOne = id => User.findById(id).populate();

module.exports.update = (id, updateData) => User.findByIdAndUpdate(id, updateData, {new: true});

module.exports.delete = id => User.findByIdAndRemove(id);
