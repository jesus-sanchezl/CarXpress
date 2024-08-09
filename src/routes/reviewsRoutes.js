const express = require("express");
const validateAuth = require("../middlewares/validateAuth");
const deleteReviewsById = require("../controllers/reviews/deleteReviewsByIdController");

const reviewsRoutes = express.Router();

reviewsRoutes.route("/:id").all(validateAuth).delete(deleteReviewsById);

module.exports = reviewsRoutes;
