const createJsonError = require("../../errors/createJsonError");
const findAllBrands = require("../../repositories/brandsRepository");

const getBrands = async (req, res) => {
    try {
        const brands = await findAllBrands();

        res.status(200);
        res.send(brands);
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = getBrands;
