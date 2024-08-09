const throwJsonError = require("../errors/throwJsonError");

const isAdmin = (role) => {
    if (role !== "admin") {
        throwJsonError(401, "No tienes permisos para acceder");
    }

    return true;
};

module.exports = isAdmin;
