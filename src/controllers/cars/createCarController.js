const Joi = require('joi')

const createJsonError = require("../../errors/createJsonError");
const { addCar } = require('../../repositories/carsRepository');
const isAdmin = require('../../helpers/utils');


const schema = Joi.object().keys({
      brand: Joi.string().min(2).max(20).required(),
      model: Joi.string().min(2).max(20).required(),
      year: Joi
            .number()
            .integer()
            .positive()
            .min(1950)
            .max(new Date().getFullYear()),
      engine: Joi.string().valid('Diesel', 'Gasolina', 'Híbrido', 'Eléctrico'),
      cv: Joi.number().integer().positive().min(60).max(500)
})

const createCar = async (req, res) => {
      try {

            const { role } = req.auth;
            isAdmin(role);
            


            const { body } = req;
            await schema.validateAsync(body)



            const carId = await addCar(body)



            res.status(201)
            res.send({
                  message: `Coche ${carId} creado correctamente`
            })
      } catch (error) {
            createJsonError(error, res)
      }
}


module.exports = createCar;