const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { findCarById } = require("../../repositories/carsRepository");

const getCarById = async (req, res) => {
    try {
        const { id } = req.params;

        const car = await findCarById(id);

        if (!car) {
            throwJsonError(400, "Parámetro no válido");
        }

        res.status(200);
        res.send(car);
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = getCarById;
