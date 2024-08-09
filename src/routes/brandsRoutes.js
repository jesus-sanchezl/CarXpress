const express = require("express");
const getBrands = require("../controllers/brands/getBrandsController");

const brandsRoutes = express.Router();

brandsRoutes.route("/").get(getBrands);

module.exports = brandsRoutes;
