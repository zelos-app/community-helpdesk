const express = require("express");
const routes = express.Router();
const api = require("./api");

routes.use("/api", api);

module.exports = routes;
