const routes = require('express').Router();
const api = require('./api');
const appRoot = require('app-root-path');
const authorize = require(appRoot + '/middleware/Auth');

routes.get('/', (req, res) => {
    // app public page with info and form
});

routes.use('/api', api);

module.exports = routes;