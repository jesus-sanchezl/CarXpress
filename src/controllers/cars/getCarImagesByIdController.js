const Joi = require('joi');


const schema = Joi.number().integer().positive().required();

const createJsonError = require("../../errors/createJsonError");
const { findAllImagesByIdCar } = require('../../repositories/carImagesRepository');
const throwJsonError = require('../../errors/throwJsonError');

const { HTTP_BACKEND } = process.env

const getCarImagesById = async (req, res) =>{
      try {
            const {carId} = req.params;
            await schema.validateAsync(carId)

            const carImages = await findAllImagesByIdCar(carId)
            if(!carImages) {
                  throwJsonError(400, 'Id no válido')
            }

            const mapperCarImages = carImages.map(imgCar => {

                  const { name, principal } = imgCar;
                  const imgUrl = `${HTTP_BACKEND}/cars/${carId}/${name}`;
                  return {
                    image: imgUrl,
                    principal,
                  }
            });

            
            res.status(200)
            res.send({carImages: mapperCarImages})
      } catch (error) {
            createJsonError(error, res)
      }
}

module.exports = getCarImagesById;