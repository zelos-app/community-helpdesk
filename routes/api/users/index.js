const users = require('express').Router();
// const { checkSchema, validationResult } = require('express-validator');
// const validation = require('./validation.js');
const appRoot = require('app-root-path');
const User = require(appRoot + '/models/User');
const handleError = require(appRoot + '/middleware/HandleError');

users.post('/', async (req, res) => {
    try {
        const user = new User();
        const admin = req.body.admin ? true : false;
        const result = await user.add(req.body.email, admin);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

users.get('/', async (req, res) => {
    
})

users.get('/:id', async (req, res) => {
    
})

users.put('/:id', async (req, res) => {
    
})

module.exports = users;