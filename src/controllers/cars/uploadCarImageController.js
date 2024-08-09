const Joi = require("joi");

const createJsonError = require("../../errors/createJsonError");
const isAdmin = require("../../helpers/utils");
const { findCarById } = require("../../repositories/carsRepository");
const throwJsonError = require("../../errors/throwJsonError");
const {
    addImageByIdCar,
    removePrincipalByCarId,
} = require("../../repositories/carImagesRepository");
const uploadImage = require("../../helpers/uploadImage");

const schema = Joi.number().integer().positive().required();
const schemaBody = Joi.number().integer().min(0).max(1).required();
const schemaFile = Joi.object().keys({
    imageCar: Joi.required(),
});

const uploadCarImageById = async (req, res) => {
    try {
        const { HTTP_BACKEND } = process.env;

        const { id } = req.params;
        await schema.validateAsync(id);

        const { role } = req.auth;
        isAdmin(role);

        const car = await findCarById(id);
        if (!car) {
            throwJsonError(400, "El coche no existe");
        }

        const { principal } = req.body;
        await schemaBody.validateAsync(principal);

        const { files } = req;
        if (!files || Object.keys(files).length === 0) {
            throwJsonError(400, "No ha seleccionado ningún fichero");
        }

        await schemaFile.validateAsync(files);

        const { imageCar } = files;
        if (!imageCar.mimetype.startsWith("image")) {
            throwJsonError(400, "Formato no válido");
        }

        // PROCESAR LA IMAGEN

        const randomName = await uploadImage(id, imageCar.data);

        if (principal === "1") {
            await removePrincipalByCarId(id);
        }

        await addImageByIdCar(id, randomName, principal);

        res.status(201);
        res.send({
            image: `${HTTP_BACKEND}/cars/${id}/${randomName}`,
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = uploadCarImageById;
