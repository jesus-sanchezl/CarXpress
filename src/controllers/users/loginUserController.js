const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { findUserByEmail } = require("../../repositories/usersRepository");

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
});

const loginUser = async (req, res) => {
    try {
        const { body } = req;
        await schema.validateAsync(body);

        const { email, password } = body;

        const user = await findUserByEmail(email);
        if (!user) {
            throwJsonError(403, "No existe usuario con ese email y/o password");
        }

        const { id, name, password: passwordHash, role, verifiedAt } = user;
        const isValidPassword = await bcrypt.compare(password, passwordHash);
        if (!isValidPassword) {
            throwJsonError(
                403,
                "Error password | No existe usuario con ese email y/o password"
            );
        }

        if (!verifiedAt) {
            throwJsonError(401, "Verifique su cuenta para acceder");
        }

        const { JWT_SECRET } = process.env;
        const tokenPayload = {
            id,
            name,
            email,
            role,
        };
        const token = jwt.sign(tokenPayload, JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201);
        res.send({
            accessToken: token,
            expiresIn: "1d",
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = loginUser;
