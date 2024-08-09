const Joi = require('joi');
const path = require('path');


const createJsonError = require("../../errors/createJsonError");
const isAdmin = require("../../helpers/utils");
const { findUserById, removeUserById } = require('../../repositories/usersRepository');
const throwJsonError = require('../../errors/throwJsonError');


const schema = Joi.number().integer().positive();

const deleteUserById = async (req, res) => {
      try {
            const {role} = req.auth;
            isAdmin(role)

            const {id} = req.params;
            await schema.validateAsync(id)

            const user = await findUserById(id)
            if (!user) {
                  throwJsonError(400, 'Usuario no existe');
            }

            let pathImage = null;
            if(user.image){
                  pathImage = path.join(__dirname, '../../../public/avatars', user.image)
                  
            }

            await removeUserById(id, pathImage)

            

            res.status(204).send()
      } catch (error) {
            createJsonError(error, res)
      }
}


module.exports = deleteUserById; 