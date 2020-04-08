const routes = require('express').Router();

const tickets = require('./tickets');
const categories = require('./categories');
const areas = require('./areas');
const users = require('./users');
const auth = require('./auth');

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Yes hello!'
    });
});

routes.use('/tickets', tickets);
routes.use('/categories', categories);
routes.use('/areas', areas);
routes.use('/users', users);
routes.use('/auth', auth);

module.exports = routes;