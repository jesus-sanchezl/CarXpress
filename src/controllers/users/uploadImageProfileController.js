const path = require("path");
const fs = require("fs/promises");
const randomstring = require("randomstring");

const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const {
    findUserById,
    uploadUserImageProfile,
} = require("../../repositories/usersRepository");

const validExtension = [".jpeg", ".jpg", ".png"];

const uploadImageProfile = async (req, res) => {
    try {
        const { HTTP_BACKEND } = process.env;

        const { id } = req.auth;

        const { files } = req;
        if (!files) {
            throwJsonError(400, "No se ha seleccionado ningún fichero");
        }

        const { avatar } = files;
        const extension = path.extname(avatar.name);
        if (!validExtension.includes(extension)) {
            throwJsonError(400, "Formato no válido");
        }

        const user = await findUserById(id);
        const { image } = user;

        const pathAvatar = path.join(__dirname, "../../../public/avatars");

        if (image) {
            await fs.unlink(`${pathAvatar}/${image}`);
        }

        const random = randomstring.generate(10);
        const imageName = `${id}-${random}${extension}`;

        const pathImage = `${pathAvatar}/${imageName}`;

        avatar.mv(pathImage, async function (err) {
            if (err) return res.status(500).send(err);

            await uploadUserImageProfile(id, imageName);
            res.send({ url: `${HTTP_BACKEND}/avatars/${imageName}` });
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = uploadImageProfile;
