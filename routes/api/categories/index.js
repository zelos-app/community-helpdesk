const categories = require('express').Router();
const appRoot = require('app-root-path');
const validate = require(appRoot + '/middleware/Validate');
const handleError = require(appRoot + '/middleware/HandleError');

const Category = require(appRoot + '/models/Category');

categories.post('/', async (req, res) => {
    try {
        // todo: validation
        const category = new Category();
        const id = await category.add(req.body);
        res.status(201).send(id);
    } catch (err) {
        handleError(err, res);
    }

})
categories.get('/', async (req, res) => {
    try {
        const category = new Category();
        const list = await category.list();
        res.send(list);
    } catch (err) {
        handleError(err, res);
    }
})

categories.get('/:id', async (req, res) => {
    try {
        // todo: validation
        const category = new Category(req.params.id);
        result = await category.get();
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})
categories.put('/:id', async (req, res) => {
    try {
        // todo: validation
        const category = new Category(req.params.id);
        result = await category.update(req.body);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})
categories.delete('/:id', async (req, res) => {
    try {
        // todo: validation
        const category = new Category(req.params.id);
        const result = await category.delete();
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

module.exports = categories;