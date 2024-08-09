const express = require('express');
const validateAuth = require('../middlewares/validateAuth');
const deleteCarImageByImageId = require('../controllers/carImages/deleteCarImageByImageIdController');



const carImagesRoutes = express.Router();

carImagesRoutes.route('/:id').all(validateAuth).delete(deleteCarImageByImageId)

module.exports = carImagesRoutes