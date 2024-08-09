const createJsonError = require("../../errors/createJsonError");
const { findUserById } = require("../../repositories/usersRepository");

const getUserProfile = async (req, res) => {
    try {
        const { id } = req.auth;

        const user = await findUserById(id);

        const { name, email, role } = user;

        res.status(200);
        res.send({ name, email, role });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = getUserProfile;
