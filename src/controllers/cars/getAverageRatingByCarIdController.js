const Joi = require('joi');

const createJsonError = require("../../errors/createJsonError");
const { findCarById } = require('../../repositories/carsRepository');
const throwJsonError = require('../../errors/throwJsonError');
const { getRating } = require('../../repositories/reviewsRepository');


const schema = Joi.number().positive().integer().required();

const getAverageRatingByCarId = async (req, res) => {
      try {
            const {carId} = req.params;
            await schema.validateAsync(carId)

            const car = await findCarById(carId)
            if(!car) {
                  throwJsonError(400, 'Coche no existe')
            }

            const rating = await getRating(carId);


            res.status(200)
            res.send(rating)
      } catch (error) {
             createJsonError(error, res)
      }
}


module.exports = getAverageRatingByCarId; 