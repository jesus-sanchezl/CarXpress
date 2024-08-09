const Joi = require("joi");

const createJsonError = require("../../errors/createJsonError");

const throwJsonError = require("../../errors/throwJsonError");
const { findCarById } = require("../../repositories/carsRepository");
const { addReview } = require("../../repositories/reviewsRepository");

const schemaId = Joi.number().integer().positive().required();
const schemaBody = Joi.object().keys({
    comment: Joi.string().min(5).max(255),
    rating: Joi.number().integer().min(0).max(5).required(),
});

const createReviewByIdCar = async (req, res) => {
    try {
        const { id } = req.auth;

        const { id: idCar } = req.params;
        await schemaId.validateAsync(idCar);

        const { body } = req;
        await schemaBody.validateAsync(body);

        const car = await findCarById(idCar);
        if (!car) {
            throwJsonError(400, "Coche no encontrado");
        }

        const { comment, rating } = body;

        const reviewId = await addReview(id, idCar, comment, rating);

        res.status(200);
        res.send({ reviewId });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = createReviewByIdCar;
