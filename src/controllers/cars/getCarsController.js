const createJsonError = require("../../errors/createJsonError");
const { findAllCars } = require("../../repositories/carsRepository");

const getCars = async (req, res) => {
    try {
        const cars = await findAllCars();

        res.status(200);
        res.send(cars);
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = getCars;
