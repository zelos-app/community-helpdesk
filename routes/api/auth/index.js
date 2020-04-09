const auth = require('express').Router();
// const { checkSchema, validationResult } = require('express-validator');
// const validation = require('./validation.js');
const appRoot = require('app-root-path');
const User = require(appRoot + '/models/User');
const handleError = require(appRoot + '/middleware/HandleError');

// register an account using invite token
auth.put('/register/:token', async (req, res) => {
    try {
        const user = new User();
        const result = await user.register(req.params.token, req.body.firstName, req.body.lastName, req.body.password);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// log in
auth.post('/login', async (req, res) => {
    try {
        const user = new User();
        const result = await user.login(req.body.email, req.body.password);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// request a password reset
auth.post('/reset', async (req, res) => {
    try {
        res.status(200).send({
            status: "ok"
        })
        const user = new User();
        user.newReset(req.query.email)
    } catch (err) {
        handleError(err, res);
    }
})

// reset user password
auth.put('/reset/:token', async (req, res) => {
    try {
        const user = new User();
        user.register(req.params.token);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// check if reset token is valid
auth.get('/reset/:token', async (req, res) => {
    try {
        const user = new User();
        const result = await user.checkToken(req.params.token);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

module.exports = auth;