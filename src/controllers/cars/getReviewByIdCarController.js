const Joi = require("joi");

const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { findCarById } = require("../../repositories/carsRepository");
const { findReviewsByIdCar } = require("../../repositories/reviewsRepository");

const schema = Joi.number().integer().positive().required();

const getReviewByIdCar = async (req, res) => {
    try {
        const { id: idCar } = req.params;

        await schema.validateAsync(idCar);

        const car = await findCarById(idCar);
        if (!car) {
            throwJsonError(400, "El coche no existe");
        }

        const reviews = await findReviewsByIdCar(idCar);

        res.status(200);
        res.send({ reviews });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = getReviewByIdCar;
