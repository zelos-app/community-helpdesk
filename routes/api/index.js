const routes = require('express').Router();
const appRoot = require('app-root-path');
const authorize = require(appRoot + '/middleware/Auth');

const tickets = require('./tickets');
const categories = require('./categories');
const areas = require('./areas');
const users = require('./users');
const auth = require('./auth');
const submit = require('./submit');

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Yes hello!'
    });
});

routes.use('/tickets', authorize, tickets);
routes.use('/categories', authorize, categories);
routes.use('/areas', authorize, areas);
routes.use('/users', authorize, users);
routes.use('/auth', auth);
routes.use('/submit', submit)

module.exports = routes;