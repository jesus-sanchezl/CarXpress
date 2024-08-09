const Joi = require("joi");

const createJsonError = require("../../errors/createJsonError");
const { findCarById, updateCar } = require("../../repositories/carsRepository");
const throwJsonError = require("../../errors/throwJsonError");
const isAdmin = require("../../helpers/utils");

const schema = Joi.number().integer().positive().required();
const schemaBody = Joi.object().keys({
    brand: Joi.string().min(2).max(20).required(),
    model: Joi.string().min(2).max(20).required(),
    year: Joi.number()
        .integer()
        .positive()
        .min(1950)
        .max(new Date().getFullYear()),
    engine: Joi.string().valid("Diesel", "Gasolina", "Híbrido", "Eléctrico"),
    cv: Joi.number().integer().positive().min(60).max(500),
});

const updateCarById = async (req, res) => {
    try {
        const { id } = req.params;
        await schema.validateAsync(id);

        const { body } = req;
        await schemaBody.validateAsync(body);

        const { role } = req.auth;
        isAdmin(role);

        const car = await findCarById(id);
        if (!car) {
            throwJsonError(400, "Coche no existe");
        }

        await updateCar(id, body);

        res.status(200);
        res.send("OK");
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = updateCarById;
