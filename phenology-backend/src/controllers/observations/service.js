const { path } = require("express/lib/application");
const Observation = require("../../models/observation.model");
const DeletedObservation = require("../../models/deletedObservation.model");
const Plant = require("../../models/plant.model");
const User = require("../../models/user.model");
const Jimp = require("jimp");
const logoPath = "./images/alap_logo_200px.png";
const uploadedFilesPath = "./phenology_uploaded_files/";

//const record = new Observation();
/*
exports.create = (observationData) => {
  const observation = new Observation(observationData);
  return observation.save();
};

*/
exports.create = (observationData) => {
  const observation = new Observation(observationData);
  observation.save();
  if (observation.photo) {
    // https://www.codedrome.com/processing-uploaded-images-with-node-and-jimp/
    Jimp.read(logoPath)
      .then((logo) => {
        console.log("observation.photo.array:", observation.photo)
        observation.photo.forEach((element) => {
          Jimp.read(uploadedFilesPath + element)
            .then((image) => {
              console.log("composite starts");
              image.composite(logo, 30, 30, { opacitySource: 0.5 });
              image
                .writeAsync(element)
                .then(() => console.log("image saved"))
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => {
              console.error(err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return;
};

exports.findAll = () =>
  Observation.find()
    .populate({ path: "plant", select: "name" })
    //.populate("plant", { name: 1 })
    // another syntax:
    .populate("user", { firstName: 1, lastName: 1 });

exports.findAllByUserId = (userId) =>
  Observation.find({ user: userId })
    .populate({ path: "plant", select: "name" })
    //.populate("plant", { name: 1 })
    // another syntax:
    .populate("user", { firstName: 1, lastName: 1 });

exports.findOne = (id) => Observation.findById(id).populate("plant");

exports.moveOne = (id) =>
  Observation.findById(id).then((doc) => {
    const record = {
      date: doc.date,
      location: doc.location,
      gps: doc.gps,
      plant: doc.plant,
      phase: doc.phase,
      photo: doc.photo,
      note: doc.note,
      user: doc.user,
      createdAt: doc.createdAt,
    };
    const deletedObservation = new DeletedObservation(record);
    deletedObservation
      .save()
      .then(() => {
        console.log("Saved successfully");
        Observation.findByIdAndRemove(id)
          .then(() => console.log("Removed successfully"))
          .catch((error) => {
            console.log("remove error:", error);
          });
      })
      .catch((error) => {
        console.log("save error:", error);
      });
  });

//exports.delete = (id) => Observation.findByIdAndRemove(id);

/*
exports.update = (id, updateData) =>
  Observation.findByIdAndUpdate(id, updateData, { new: true });

*/
