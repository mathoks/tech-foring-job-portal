const express = require("express");
const jobRoutes = require("./jobRoutes");
const authRoutes = require("./authenticationRoutes");
const userRoutes = require("./usersRoute");

const apiV1 = express.Router();

apiV1.use("/users", userRoutes);
apiV1.use("/auth", authRoutes);
apiV1.use("/jobs", jobRoutes)

module.exports = apiV1;