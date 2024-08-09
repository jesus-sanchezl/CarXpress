const Joi = require('joi')
const bcrypt = require('bcrypt')
const randomstring = require('randomstring')

const createJsonError = require("../../errors/createJsonError");
const { findUserById, findUserByEmail, updateUserById, addVerificationCode } = require('../../repositories/usersRepository');
const throwJsonError = require('../../errors/throwJsonError');
const { sendMailRegister } = require('../../helpers/mailSmtp');



const schema = Joi.object().keys({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      repeatPassword: Joi.string().optional(),
});

const schemaPassword = Joi.object().keys({
      password: Joi.string().min(4).max(20).required(),
      repeatPassword: Joi.ref('password'),
});





const updateUser = async (req, res ) => {

      try {
            const { id } = req.auth;
            const { body } = req;
            await schema.validateAsync(body)
            const { name, email, password, repeatPassword } = req.body;
      
            console.log(req.body);
            console.log(req.auth);



            const userById = await findUserById(id)
            const user = await findUserByEmail(email)

            if (user && user.id !== id) {
                  throwJsonError(409, 'Ya existe un usurio con ese email')
            }


            let updatedPassword = userById.password;
            if(password) {
                  await schemaPassword.validateAsync({password, repeatPassword})
                  const passwordHash = await bcrypt.hash(password, 12)

                  updatedPassword = passwordHash
            }

            await updateUserById({id, name, email, password: updatedPassword})

            if (email !== userById.email) {
                  const verificationCode = randomstring.generate(64)
                  await addVerificationCode(id, verificationCode);
                  await sendMailRegister(name, email, verificationCode)
            }

            

            res.status(200)
            res.send({id, name, email, role: userById.role})
      } catch (error) {
            createJsonError(error, res)
      }
}


module.exports = updateUser;