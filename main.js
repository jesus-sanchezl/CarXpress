require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileupload = require("express-fileupload");

const carsRoutes = require("./src/routes/carsRoutes");
const brandsRoutes = require("./src/routes/brandsRoutes");
const userRoutes = require("./src/routes/usersRoutes");
const reviewsRoutes = require("./src/routes/reviewsRoutes");
const carImagesRoutes = require("./src/routes/carImagesRoutes");

const { PORT } = process.env;

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(fileupload());
app.use(express.static("public"));

app.use("/api/v1/cars", carsRoutes);

app.use("/api/v1/brands", brandsRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/reviews", reviewsRoutes);

app.use("/api/v1/carImages", carImagesRoutes)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}🌍`);
});
