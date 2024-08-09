const Joi = require("joi");

const createJsonError = require("../../errors/createJsonError");
const isAdmin = require("../../helpers/utils");
const { findCarById } = require("../../repositories/carsRepository");
const throwJsonError = require("../../errors/throwJsonError");
const { addImageByIdCar } = require("../../repositories/carImagesRepository");
const uploadImage = require("../../helpers/uploadImage");

const schema = Joi.number().integer().positive().required();
const schemaFile = Joi.object().keys({
    imagesCar: Joi.required(),
});

const uploadMultipleCarImagesById = async (req, res) => {
    try {
        const { HTTP_BACKEND } = process.env;

        const { id } = req.params;
        await schema.validateAsync(id);

        const { role } = req.auth;
        isAdmin(role);

        const car = await findCarById(id);
        if (!car) {
            throwJsonError(400, "No existe el coche");
        }

        const { files } = req;
        if (!files) {
            throwJsonError(400, "No ha seleccionado ningún fichero");
        }
        await schemaFile.validateAsync(files);

        const { imagesCar } = files;
        console.log("aqui llegaa", imagesCar);

        const uploadImages = await Promise.all(
            imagesCar.map(async (imgCar) => {
                console.log("-------", imgCar);
                const { data } = imgCar;
                const randomName = await uploadImage(id, data);

                await addImageByIdCar(id, randomName);

                return { image: `${HTTP_BACKEND}/cars/${id}/${randomName}` };
            })
        );

        res.status(201);
        res.send({ uploadImages });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = uploadMultipleCarImagesById;
