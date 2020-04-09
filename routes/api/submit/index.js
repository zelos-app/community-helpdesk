const submit = require('express').Router();
const { checkSchema, validationResult } = require('express-validator');
const validation = require('./validation.js');
const appRoot = require('app-root-path');
const Ticket = require(appRoot + '/models/Ticket');
const Category = require(appRoot + '/models/Category');
const Area = require(appRoot + '/models/Area');
const handleError = require(appRoot + '/middleware/HandleError');

// Submit a ticket
submit.post('/', async (req, res) => {
    const ticket = new Ticket();
    try {
        // unvalidated
        const id = await ticket.add({
            ...req.body
        });
        res.status(201).send(id);
    } catch (err) {
        handleError(err, res);
    }
})

submit.get('/', async (req, res) => {
    try {
        // unvalidated
        const category = new Category();
        const area = new Area();
        allCategories = await category.list("public");
        allAreas = await area.list("public");
        const result = {
            status: "ok",
            categories: allCategories,
            areas: allAreas
        }

        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

module.exports = submit;