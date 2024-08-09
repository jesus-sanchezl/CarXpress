const jwt = require("jsonwebtoken");

const createJsonError = require("../errors/createJsonError");
const throwJsonError = require("../errors/throwJsonError");

const extractAccessToken = (headers) => {
    const { authorization } = headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        throwJsonError(403, "Autorización requerida");
    }

    return authorization.split(" ")[1];
};

const validateAuth = (req, res, next) => {
    try {
        const { headers } = req;
        const { JWT_SECRET } = process.env;

        const token = extractAccessToken(headers);

        const decodeToken = jwt.verify(token, JWT_SECRET);

        const { id, name, email, role } = decodeToken;
        req.auth = { id, name, email, role };

        next();
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = validateAuth;
