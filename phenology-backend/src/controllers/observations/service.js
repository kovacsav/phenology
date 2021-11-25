const Observation = require("../../models/observation.model");
const Plant = require("../../models/plant.model");

exports.create = (observationData) => {
  const observation = new Observation(observationData);
  return observation.save()
    .then(() => Plant.findById(observationData.plant))
    .then((plant) => {
      plant.observations.push(observation._id);
      return plant.save();
    })
    .then(() => observation);
};

exports.findAll = () => Observation.find();

exports.findOne = (id) => Observation.findById(id).populate('plant');

exports.update = (id, updateData) =>
  Observation.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => Observation.findByIdAndRemove(id);
