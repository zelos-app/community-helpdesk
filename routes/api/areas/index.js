const areas = require('express').Router();
const appRoot = require('app-root-path');
const handleError = require(appRoot + '/middleware/HandleError');

const Area = require(appRoot + '/models/Area');

areas.post('/',async (req, res) => {
    try {
      // todo: validation
      const area = new Area();
      const id = await area.add(req.body);
      res.status(201).send(id);
    } catch (err) {
      handleError(err, res);
    }
  })
areas.get('/',async (req, res) => {
    try {
      const area = new Area();
      const list = await area.list();
      res.send(list);
    } catch (err) {
      handleError(err, res);
    }
  })

areas.get('/:id',async (req, res) => {
    try {
      // todo: validation
      const area = new Area(req.params.id);
      result = await area.get();
      res.send(result);
    } catch (err) {
      handleError(err, res);
    }
  })
areas.put('/:id',async (req, res) => {
    try {
      // todo: validation
      const area = new Area(req.params.id);
      result = await area.update(req.body);
      res.send(result);
    } catch (err) {
      handleError(err, res);
    }
  })
areas.delete('/:id',async (req, res) => {
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