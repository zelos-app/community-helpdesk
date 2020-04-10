const express = require("express");
const routes = express.Router();
const api = require("./api");

routes.use("/api", api);
routes.use("/", express.static("./front/build"));

module.exports = routes;
