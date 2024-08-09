const express = require("express");
const getCars = require("../controllers/cars/getCarsController");
const getCarById = require("../controllers/cars/getCarByIdController");
const createCar = require("../controllers/cars/createCarController");
const validateAuth = require("../middlewares/validateAuth");
const deleteCarById = require("../controllers/cars/deleteCarByIdController");
const createReviewByIdCar = require("../controllers/cars/createReviewByIdCarController");
const getReviewByIdCar = require("../controllers/cars/getReviewByIdCarController");
const updateCarById = require("../controllers/cars/updateCarByIdController");
const uploadCarImageById = require("../controllers/cars/uploadCarImageController");
const uploadMultipleCarImagesById = require("../controllers/cars/uploadMultipleCarImagesByIdController");
const getCarImagesById = require("../controllers/cars/getCarImagesByIdController");
const getAverageRatingByCarId = require("../controllers/cars/getAverageRatingByCarIdController");

const carsRoutes = express.Router();

carsRoutes.route("/").get(getCars);
carsRoutes.route("/:id").get(getCarById);
carsRoutes.route('/:carId/images').get(getCarImagesById)

carsRoutes.route("/:id/reviews").get(getReviewByIdCar);
carsRoutes.route('/:carId/rating').get(getAverageRatingByCarId)

carsRoutes.route("/").all(validateAuth).post(createCar);
carsRoutes
    .route("/:id")
    .all(validateAuth)
    .put(updateCarById)
    .delete(deleteCarById);
carsRoutes.route("/:id/reviews").all(validateAuth).post(createReviewByIdCar);
carsRoutes.route("/:id/images").all(validateAuth).post(uploadCarImageById);
carsRoutes
    .route("/:id/multipleImages")
    .all(validateAuth)
    .post(uploadMultipleCarImagesById);

module.exports = carsRoutes;
