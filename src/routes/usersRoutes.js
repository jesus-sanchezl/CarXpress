const express = require("express");
const loginUser = require("../controllers/users/loginUserController");
const registerUser = require("../controllers/users/registerUserController");
const getUser = require("../controllers/users/getUserController");
const activateUser = require("../controllers/users/activateUserController");
const validateAuth = require("../middlewares/validateAuth");
const getUserProfile = require("../controllers/users/getUserProfile");
const uploadImageProfile = require("../controllers/users/uploadImageProfileController");
const updateUser = require("../controllers/users/updateUserController");
const getUserReviewsById = require("../controllers/users/getUserReviewsByIdController");
const deleteUserById = require("../controllers/users/deleteUserByIdController");


const userRoutes = express.Router();

userRoutes.route("/").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/activation").get(activateUser);



userRoutes.route("/").get(getUser);
userRoutes.route("/profile")
      .all(validateAuth)
      .get(getUserProfile)
      .put(updateUser)
userRoutes.route("/upload").all(validateAuth).post(uploadImageProfile);
userRoutes.route('/:id/reviews').all(validateAuth).get(getUserReviewsById);
userRoutes.route('/:id').all(validateAuth).delete(deleteUserById)

module.exports = userRoutes;
