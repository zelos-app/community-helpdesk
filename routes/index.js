const routes = require('express').Router();
const api = require('./api');

routes.get('/', (req, res) => {
    // app public page with info and form
});

routes.use('/api', api);

module.exports = routes;