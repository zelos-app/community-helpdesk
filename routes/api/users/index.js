const users = require('express').Router();
// const { checkSchema, validationResult } = require('express-validator');
// const validation = require('./validation.js');
const appRoot = require('app-root-path');
const User = require(appRoot + '/models/User');
const handleError = require(appRoot + '/middleware/HandleError');

// invite an user
users.post('/invite', async (req, res) => {
    try {
        const user = new User();
        const admin = req.body.admin ? true : false;
        const result = await user.add(req.body.email, admin);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// list all users
users.get('/', async (req, res) => {
    try {
        const users = new User();
        const result = await users.list(req.query.limit, req.query.skip);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// show user details
users.get('/:id', async (req, res) => {
    try {
        const data = await new User().get(req.params.id);
        res.send(data);
    } catch (err) {
        handleError(err, res);
    }
})

// update user details
users.put('/:id', async (req, res) => {
    try {
        const user = new User();
        result = await user.update(req.params.id, req.body);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

module.exports = users;