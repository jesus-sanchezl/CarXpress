const Joi = require('joi')

const createJsonError = require("../../errors/createJsonError");
const isAdmin = require("../../helpers/utils");
const { findUserById, findReviewsByUserId } = require('../../repositories/usersRepository');
const throwJsonError = require('../../errors/throwJsonError');


const schema = Joi.number().integer().positive();


const getUserReviewsById = async (req, res) => {
      try {
            
            const {role} = req.auth;
            isAdmin(role)

            const { id } = req.params;
            await schema.validateAsync(id)

            const user = await findUserById(id)
            if(!user){
                  throwJsonError(400, 'Usuario no existe')
            }

            const reviews = await findReviewsByUserId(id)
      
            if(!reviews || reviews.length === 0) {
                  throwJsonError(400, 'No existen reviews')
            }

            

            res.send(reviews)
      } catch (error) {
            createJsonError(error, res)
      }
}


module.exports = getUserReviewsById;