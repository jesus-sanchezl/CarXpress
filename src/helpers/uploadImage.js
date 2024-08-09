const path = require("path");
const sharp = require("sharp");
const { ensureDir } = require("fs-extra");
const randomstring = require("randomstring");

const uploadImage = async (id, imageData) => {
    const uploadDirectory = path.join(__dirname, "../../public/cars", id);

    ensureDir(uploadDirectory);

    const image = sharp(imageData);
    const randomName = randomstring.generate(10) + ".png";

    await image
        .resize(600, 600)
        .toFormat("png")
        .composite([
            {
                input: path.join(
                    __dirname,
                    "../resources/reviews-cars-watermark.png"
                ),
                gravity: "southeast",
            },
        ])
        .toFile(path.join(uploadDirectory, randomName));

    return randomName;
};

module.exports = uploadImage;
