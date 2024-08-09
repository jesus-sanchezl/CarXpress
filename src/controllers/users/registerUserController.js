const Joi = require("joi");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");

const createJsonError = require("../../errors/createJsonError");
const {
    findUserByEmail,
    createUser,
} = require("../../repositories/usersRepository");
const throwJsonError = require("../../errors/throwJsonError");
const { sendMailRegister } = require("../../helpers/mailSmtp");

const schema = Joi.object().keys({
    name: Joi.string().min(4).max(120).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
    verifyPassword: Joi.ref("password"),
});

const registerUser = async (req, res) => {
    try {
        const { body } = req;
        await schema.validateAsync(body);

        const { name, email, password } = body;

        const user = await findUserByEmail(email);
        if (user) {
            throwJsonError(409, "Ya existe usuario con ese email");
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const verificationCode = randomstring.generate(64);

        const userDB = {
            name,
            email,
            password: passwordHash,
            verificationCode,
        };

        const userId = await createUser(userDB);

        await sendMailRegister(name, email, verificationCode);

        res.status(201);
        res.send({ id: userId });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = registerUser;
