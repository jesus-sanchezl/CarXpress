const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { sendMailCorrectActivation } = require("../../helpers/mailSmtp");
const {
    findUserByVerficiationCode,
    activateUserByCode,
} = require("../../repositories/usersRepository");

const activateUser = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            throwJsonError(400, "Código no válido");
        }

        const user = await findUserByVerficiationCode(code);

        if (!user) {
            throwJsonError(400, "Código no encontrado");
        }

        const { name, email, verifiedAt } = user;
        if (verifiedAt) {
            throwJsonError(409, "Usuario ya activado");
        }

        await activateUserByCode(code);

        await sendMailCorrectActivation(name, email);

        res.status(200);
        res.send({ message: "Cuenta Activada" });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = activateUser;
