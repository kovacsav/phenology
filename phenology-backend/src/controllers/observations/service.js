const { path } = require("express/lib/application");
const Observation = require("../../models/observation.model");
const DeletedObservation = require("../../models/deletedObservation.model");
const Plant = require("../../models/plant.model");
const User = require("../../models/user.model");
const Jimp = require("jimp");
const logoPath = "./images/logo_x.png";
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
  return observation.save().then(() => {
    if (observation.photo) {
      // logo on uploaded image
      // https://www.codedrome.com/processing-uploaded-images-with-node-and-jimp/
    
      Jimp.read(logoPath)
        .then((logo) => {
          console.log("observation.photo.array:", observation.photo);
          observation.photo.forEach((element) =>
            logoOnImage(logo, element, 0)
            /*(element) => {
            Jimp.read(uploadedFilesPath + element)
              .then((image) => {
                console.log("composite starts");
                const x = 10;
                const y = image.bitmap.height - 10 - logo.bitmap.height;
                image.composite(logo, x, y, { opacitySource: 1 });
                image
                  .writeAsync(uploadedFilesPath + element)
                  .then(() => console.log("image saved"))
                  .catch((err) => {
                    console.error(err);
                  });
              })
              .catch((err) => {
                console.error(err);
              });
              
            });
            */
          )
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
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

async function logoOnImage(logo, uploadedImage, retries = 0) {
  let maxRetries = 5;
  try {
    image = await Jimp.read(uploadedFilesPath + uploadedImage);
    console.log("composite starts");
    const x = 10;
    const y = (await image.bitmap.height) - 10 - logo.bitmap.height;
    await image.composite(logo, x, y, { opacitySource: 1 });
    await image.writeAsync(uploadedFilesPath + uploadedImage);
    //console.log("image saved");
  } catch (error) {
    if (retries >= maxRetries) {
      throw error;
    }
    image = await logoOnImage(logo, uploadedImage, retries++);
  }
}

/*
Error: marker was not found
https://github.com/oliver-moran/jimp/issues/102

async function retryResize(options, retries = 0) {
    let { imagePath, size, quality = 60, maxRetries = 5 } = options;

    let image = null;
    try {
        image = await Jimp.read(imagePath);
        await image.resize(size, Jimp.AUTO);
        await image.quality(quality);
    } catch (e) {
        if (retries >= maxRetries) {
            throw e;
        }

        image = await retryResize(options, retries++);
    }

    return image;
}

*/

//exports.delete = (id) => Observation.findByIdAndRemove(id);

/*
exports.update = (id, updateData) =>
  Observation.findByIdAndUpdate(id, updateData, { new: true });

*/
