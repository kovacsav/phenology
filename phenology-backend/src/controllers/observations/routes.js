const express = require("express");
const controller = require('./controller');

const router = express.Router();

// Authenctication.
const authenticateJwt = require("../../auth/authenticate");

// create
router.post('/', authenticateJwt, (req, res, next) => {
  //console.log(req.headers.authorization);
  return controller.create(req, res, next);
});

// read
router.get('/', (req, res, next) => {
  return controller.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  return controller.findOne(req, res, next);
});

/*
// update
router.put('/:id', (req, res, next) => {
  return controller.update(req, res, next);
});

// delete
router.delete('/:id', (req, res, next) => {
  return controller.delete(req, res, next);
});
*/

module.exports = router;


// const express = require("express");
// // const data = require("./data");
// const Plant = require("../../models/plant.model");
// const createError = require("http-errors");
// const logger = require("../../config/logger");

// const controller = express.Router();

// // Read.
// controller.get("/", (req, res) => {
//   // logger.debug(`Get all persons, returning ${data.length} items.`);
//   // res.json(data);

//   Plant.find().then((plants) => {
//     logger.debug(`Get all plants, returning ${plants.length} items.`);
//     res.json(plants);
//   });
// });

// // Get one.
// controller.get("/:id", async (req, res, next) => {
//   // const plant = data.find((p) => p.id === parseInt(req.params.id));
//   const plant = await Plant.findById(req.params.id);
//   if (!plant) {
//     return next(new createError.NotFound("Plant is not found"));
//   }

//   res.json(plant);
// });

// // Create.
// controller.post("/", (req, res, next) => {
//   if (!req.body["name"] || !req.body["latin"] || !req.body["category"]) {
//     return next(
//       new createError.BadRequest(
//         "Request body must contain name, latin, category parameters"
//       )
//     );
//   }

//   // const newOne = req.body;
//   // newOne.id = data[data.length - 1].id + 1;
//   // data.push(newOne);

//   // res.status(201);
//   // res.json(newOne);

//   const newPlant = new Plants({
//     name: req.body["name"],
//     latin: req.body["latin"],
//     category: req.body["category"],
//   });
//   newPlant.save().then((data) => {
//     res.status(201);
//     res.json(data);
//   });
// });

// // Update.
// controller.patch("/:id", async (req, res, next) => {
//   const id = req.params.id;
//   console.log(id);
//   // const index = data.findIndex((p) => p.id === id);
//   const { name, latin, category } = req.body;
//   if (!name || !latin || !category) {
//     return next(new createError.BadRequest("Missing properties!"));
//   }
//   // data[index] = {
//   //   id: id,
//   //   name: req.body["name"],
//   //   latin: req.body["latin"],
//   //   category: req.body["category"],
//   // };
//   // res.send(data[index]);

//   const update = {
//     name: name,
//     latin: latin,
//     category: category,
//   };

//   let plant = {};
//   try {
//     plant = await Plant.findByIdAndUpdate(id, update, {
//       new: true,
//       useFindAndModify: false,
//     });
//   } catch (err) {
//     return next(new createError.BadRequest(err));
//   }

//   return res.json(plant);
// });

// controller.put("/:id", async (req, res, next) => {
//   const id = req.params.id;
//   const { name, latin, category } = req.body;
//   if (!name || !latin || !category) {
//     return next(new createError.BadRequest("Missing properties!"));
//   }
//   const update = {
//     name: name,
//     latin: latin,
//     category: category,
//   };
//   let plant = {};
//   try {
//     plant = await Plant.findByIdAndUpdate(id, update, {
//       new: true,
//       useFindAndModify: false,
//     });
//   } catch (err) {
//     return next(new createError.BadRequest(err));
//   }
//   return res.json(plant);
// });

// // Delete.
// controller.delete("/:id", async (req, res, next) => {
//   const { id } = req.params;
//     try {
//         const plant = await Plant.findByIdAndDelete(id);
//     } catch (err) {
//         return next(new createError.NotFound("Plant is not found"));
//     }
//     res.json({});

// });

// module.exports = controller;
