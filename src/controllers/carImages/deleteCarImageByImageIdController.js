const Joi = require('joi');
const path = require('path');

const createJsonError = require("../../errors/createJsonError")
const isAdmin = require("../../helpers/utils");
const { findImageById, deleteCarImageById } = require('../../repositories/carImagesRepository');
const throwJsonError = require('../../errors/throwJsonError');



const schema = Joi.number().integer().positive().required();


const deleteCarImageByImageId = async (req, res) => {
      try {

            const { role } = req.auth
            isAdmin(role)

            const {id} = req.params;
            await schema.validateAsync(id)

            const imageCar = await findImageById(id)
            if (!imageCar) {
                  throwJsonError(400, 'Coche no existe');
            }

            const pathImage = path.join(__dirname, '../../../public/cars', imageCar.idCar.toString(), imageCar.name)

            await deleteCarImageById(id, pathImage)

            
            res.status(200)
            res.send({message: 'Imagen de coche eliminada'})
      } catch (error) {
            createJsonError(error, res)
      }
}


module.exports = deleteCarImageByImageId; 