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
        return ticket;
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

    // Remove a ticket
    async delete(id) {
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
}


module.exports = Ticket;