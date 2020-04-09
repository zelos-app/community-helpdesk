const mongoose = require('mongoose');
const createError = require('http-errors');

const ticketSchema = new mongoose.Schema({
    name: String,
    phone: String,
    area: String,
    address: String,
    request: String,
    type: String,
    owner: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    comments: [
        {
            comment: String,
            creator: {
                system: Boolean,
                id: String
            }
        }
    ],
    status: {
        rejected: {
            type: Boolean,
            default: false
        },
        accepted: {
            type: Boolean,
            default: false
        },
        solved: {
            type: Boolean,
            default: false
        },
        archived: {
            type: Boolean,
            default: false
        },
        notified: {
            type: Boolean,
            default: false
        },
        task: {
            created: {
                type: Boolean,
                default: false
            },
            url: {
                type: String,
                default: ""
            }
        }
    }
});

const TicketModel = mongoose.model('Ticket', ticketSchema);

class Ticket {
    constructor(id) {
        this.data = {}
        this.id = id;
    }

    // List tickets with an optional filter
    async list(filter = {}) {
        const limit = filter.limit ? filter.limit : 100;
        const skip = filter.skip ? filter.skip : 0;
        delete filter.limit;
        delete filter.skip;
        console.log(`[d] Getting tickets with:\n\tFilter: ${JSON.stringify(filter)}\n\tLimit: ${limit}\n\tSkip: ${skip}`);
        const tickets = await TicketModel.find(filter, null, {
            skip: skip,
            limit: limit
        });
        const result = {
            count: {}
        };
        result.count.returned = tickets.length;
        result.count.total = await TicketModel.estimatedDocumentCount();
        result.tickets = tickets;
        result.settings = {
            limit: limit,
            skip: skip,
        }
        return result;
    }

    // Get a single ticket
    async get() {
        const ticket = await TicketModel.findById(this.id);
        if (ticket) {
            return ticket;
        } else {
            const err = createError(404, {
                status: "error",
                message: "Not found"
            });
            throw err;
        }
    }

    // Add a new request ticket
    async add(fields) {
        for (const [key, value] of Object.entries(fields)) {
            this.data[key] = value;
        }
        const ticket = new TicketModel(this.data);
        const newTicket = await ticket.save();
        console.log(`[i] New ticket: ${newTicket._id}`);
        return {
            id: newTicket._id
        }
    }

    // Update a ticket
    async update(fields) {
        for (const [key, value] of Object.entries(fields)) {
            this.data[key] = value;
        }
        await TicketModel.updateOne({ _id: this.id }, {...this.data});
        return {
            status: "ok",
            message: "Updated",
            fields: {...this.data}
        }
    }

    // Assign ownership to ticket
    async assign(userId) {
        await TicketModel.updateOne({ _id: this.id }, {owner: userId});
        return {
            status: "ok",
            message: "Assigned"
        }
    }
    // Clear ownership
    async unassign() {
        await TicketModel.updateOne({ _id: this.id }, {owner: null});
        return {
            status: "ok",
            message: "Unassigned"
        }
    }

    // Approve a ticket
    async approve(query) {
        const ticket = this.get();
        // Create a task on Zelos
        
        // Store task info
        // Send a notification request
        // Update ticket
    }

    // Reject a ticket

    // Remove a ticket
    async delete(id = this.id) {
        console.log(`[d] Trying to remove ticket "${id}"`);
        if (id) {
            const res = await TicketModel.deleteOne({
                _id: id
            })
            if (res.ok === 1) {
                if (res.n) {
                    return {
                        status: "ok"
                    }
                } else {
                    const err = createError(404, {
                        status: "error",
                        message: "Not found"
                    });
                    throw err;
                }
            }
        } else {
            const err = createError(400, {
                status: "error",
                message: "No id's specified"
            });
            throw err;
        }
    }

    // Add a comment
    async addComment(comment, user = null) {
        const ticket = await TicketModel.findById(this.id);
        const newComment = {
            comment: comment,
            creator: {}
        }
        if (!user) {
            newComment.creator.system = true;
        } else {
            newComment.creator.id = user;
        }
        ticket.comments.push(newComment);
        const result = await ticket.save();
        return {
            status: "ok",
            id: result.comments[result.comments.length -1]._id
        }
    }

    // Remove a comment
    async removeComment(commentId) {
        const ticket = await TicketModel.findById(this.id);
        console.log(`Comments before:\n${ticket.comments}`);
        let count = 0;
        ticket.comments = ticket.comments.filter(obj => {
            if (obj._id != commentId) {
                return true
            } else {
                count++
            }
        })
        if (count === 1) {
            await ticket.save();
            return {
                status: "ok"
            }
        } else {
            const err = createError(404, {
                status: "error",
                message: "Not found"
            });
            throw err;
        }
    }
}

module.exports = Ticket;