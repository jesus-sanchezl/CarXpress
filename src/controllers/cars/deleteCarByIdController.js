const Joi = require("joi");

const createJsonError = require("../../errors/createJsonError");
const isAdmin = require("../../helpers/utils");
const {
    findCarById,
    removeCarById,
} = require("../../repositories/carsRepository");
const throwJsonError = require("../../errors/throwJsonError");

const schema = Joi.number().positive().integer().required();

const deleteCarById = async (req, res) => {
    try {
        const { role } = req.auth;
        isAdmin(role);

        const { id } = req.params;
        await schema.validateAsync(id);

        const car = await findCarById(id);
        if (!car) {
            throwJsonError(400, "Coche no encontrado");
        }

        await removeCarById(id);

        res.status(200);
        res.send({
            messge: `Coche con id ${id} borrado correctamente`,
            data: car,
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = deleteCarById;
