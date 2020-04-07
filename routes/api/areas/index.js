const areas = require('express').Router();
const { checkSchema, validationResult } = require('express-validator');
const validation = require('./validation.js');
const appRoot = require('app-root-path');
const handleError = require(appRoot + '/middleware/HandleError');

const Area = require(appRoot + '/models/Area');

areas.post('/', checkSchema(validation.newArea), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
        const area = new Area();
        const response = await area.add(req.body);
        res.status(201).send(response);
    } catch (err) {
        handleError(err, res);
    }
})
areas.get('/', async (req, res) => {
    try {
        const area = new Area();
        const list = await area.list();
        res.send(list);
    } catch (err) {
        handleError(err, res);
    }
})

areas.get('/:id', async (req, res) => {
    try {
        // todo: validation
        const area = new Area(req.params.id);
        result = await area.get();
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})
areas.put('/:id', async (req, res) => {
    try {
        // todo: validation
        const area = new Area(req.params.id);
        result = await area.update(req.body);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})
areas.delete('/:id', async (req, res) => {
    try {
        // todo: validation
        const area = new Area(req.params.id);
        const result = await area.delete();
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

module.exports = areas;