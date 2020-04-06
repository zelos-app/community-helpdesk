const routes = require('express').Router();
const api = require('./api');
const auth = require('./auth');
const app = require('./app');

routes.get('/', (req, res) => {
    // app public page with info and form
});

routes.use('/api', api);
routes.use('/auth', auth);
routes.use('/app', app);

module.exports = routes;