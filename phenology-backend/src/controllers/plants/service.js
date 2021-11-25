const Plant = require('../../models/plant.model');

exports.create = plantData => {
    const plant = new Plant(plantData);
    return plant.save();
};

exports.findAll = () => Plant.find().populate('observations');

exports.findOne = id => Plant.findById(id).populate('observations');

exports.update = (id, updateData) => Plant.findByIdAndUpdate(id, updateData, {new: true});

exports.delete = id => Plant.findByIdAndRemove(id);
