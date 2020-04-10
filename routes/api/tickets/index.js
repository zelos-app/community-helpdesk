const tickets = require('express').Router();
const {
    checkSchema,
    validationResult
} = require('express-validator');
const validation = require('./validation.js');
const appRoot = require('app-root-path');
const Ticket = require(appRoot + '/models/Ticket');
const handleError = require(appRoot + '/middleware/HandleError');

// List all tickets
tickets.get('/', checkSchema(validation.listTickets), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    try {
        const ticket = new Ticket();
        const result = await ticket.list({
            ...req.query
        });
        res.json({
            status: "ok",
            count: result.count,
            tickets: result.tickets,
            settings: result.settings
        });
    } catch (err) {
        handleError(err, res);
    }
})

// Create a ticket
tickets.post('/', async (req, res) => {
    const ticket = new Ticket();
    try {
        // unvalidated
        const id = await ticket.add({
            ...req.body
        }, req.user._id);
        res.status(201).send(id);
    } catch (err) {
        handleError(err, res);
    }
})

// Assign user to ticket
tickets.put('/:id/assign', async (req, res) => {
    try {
        // unvalidated
        const ticket = new Ticket(req.params.id);
        result = await ticket.assign(req.query.id);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// Clear ticket owner
tickets.delete('/:id/assign', async (req, res) => {
    try {
        // unvalidated
        const ticket = new Ticket(req.params.id);
        result = await ticket.unassign();
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// Get a single ticket
tickets.get('/:id', async (req, res) => {
    try {
        // unvalidated
        const ticket = new Ticket(req.params.id);
        result = await ticket.get();
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// Update ticket details
tickets.put('/:id', async (req, res) => {
    try {
        // unvalidated
        const ticket = new Ticket(req.params.id);
        result = await ticket.update(req.body);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// Moderate ticket (approve/reject/resolve)
tickets.put('/:id/:action', async (req, res) => {
    try {
        if (action === "approve" || action === "reject" || action === "resolve") {
            console.log(req.params.action)
            const ticket = new Ticket(req.params.id);
            const result = await ticket[req.params.action](req.query, req.body.comment);
            res.send(result);
        } else {
            res.status(422).send("You can only /approve, /reject or /resolve")
        }
        
    } catch (err) {
        handleError(err, res);
    }
})

// Delete a ticket
tickets.delete('/:id', async (req, res) => {
    try {
        // unvalidated
        const ticket = new Ticket(req.params.id);
        const result = await ticket.delete();
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// Add a comment to a ticket
tickets.post('/:id/comments', async (req, res) => {
    try {
        // unvalidated
        const ticket = new Ticket(req.params.id);
        const user = null; // todo: add user ID
        result = await ticket.addComment(req.body.comment, user);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// Delete a comment
tickets.delete('/:id/comments/:commentId', async (req, res) => {
    try {
        // unvalidated
        const ticket = new Ticket(req.params.id);
        result = await ticket.removeComment(req.params.commentId);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

module.exports = tickets;