const Joi = require("joi");

const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const {
    findReviewsById,
    removeReviewById,
} = require("../../repositories/reviewsRepository");

const schema = Joi.number().integer().positive().required();

const deleteReviewsById = async (req, res) => {
    try {
        const { id: idReviews } = req.params;
        await schema.validateAsync(idReviews);

        const reviews = await findReviewsById(idReviews);
        if (!reviews) {
            throwJsonError(400, "Review no existe");
        }

        const { id, role } = req.auth;

        if (!(role === "admin" || reviews.idUser === id)) {
            throwJsonError(403, "No tienes permisos para realizar esta acción");
        }

        await removeReviewById(idReviews);

        res.status(204);
        res.send();
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = deleteReviewsById;
