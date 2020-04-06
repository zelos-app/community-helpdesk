const areas = require('express').Router();
const { checkSchema, validationResult } = require('express-validator');
const validation = require('./validation.js');
const appRoot = require('app-root-path');
const handleError = require(appRoot + '/middleware/HandleError');
const Zelos = require(appRoot + '/models/Zelos');

const Area = require(appRoot + '/models/Area');

areas.post('/', checkSchema(validation.newArea), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
        const area = new Area();
        const newArea = await area.add(req.body);
        const response = {
            id: newArea.id
        }
        // find or create a group on Zelos
        const zelos = new Zelos();
        await zelos.init();
        const group = await zelos.findGroup(req.body.name);
        if (!group) {
            console.log(`[d] Adding a new group to Zelos "${req.body.name}"`)
            const desc = req.body.description;
            const groupId = await zelos.newGroup(req.body.name, desc);
            if (groupId) {
                response.status = "ok"
                response.zelosGroupId = groupId;
                response.message = "Added area and created a new group on Zelos"
            } else {
                response.status = "warning"
                response.zelosGroupId = groupId;
                response.message = "Added area, but failed to create group on Zelos (limit reached)"
            }
            
        } else {
            console.log(`[d] Linking new area to "${req.body.name}" on Zelos`)
            response.status = "ok"
            response.zelosGroupId = group;
            response.message = "Added area and linked an existing group on Zelos"
        }
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