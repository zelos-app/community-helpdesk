const mongoose = require('mongoose');
const createError = require('http-errors');
const Area = require(`./Area`);
const Zelos = require(`./Zelos`);
const SMS = require(`./${process.env.SMS_PROVIDER}`);
const Config = require(`./Config`);

const config = new Config();

const ticketSchema = new mongoose.Schema({
    name: String,
    phone: String,
    area: String,
    address: String,
    request: String,
    category: String,
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
},
{
    minimize: false
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
        let settings = {};
        const ticket = await this.get();
        if (ticket.status && ticket.status.task && ticket.status.task.created) {
            const err = createError(409, {
                status: "error",
                message: "Ticket has already been approved"
            });
            throw err;
        }
        for (const [key, value] of Object.entries(query)) {
            settings[key] = value;
        }
        const area = await new Area(ticket.area).get();
        // create an object for task creation input
        const templates = await config.get("templates");
        const taskDetails = {
            privateFields: {
                name: ticket.name,
                phone: ticket.phone,
                address:  ticket.address,
                instructions: templates.safetyWarning
            },
            publicFields: {
                request: ticket.request
            },
            settings: {
                group: area.zelos.groupId,
                ...query
            }
        }
        // Push a task to Zelos
        try {
            const zelos = new Zelos();
            await zelos.init();
            this.taskUrl = await zelos.newTask(taskDetails);
            if (this.taskUrl) {
                ticket.status = {
                    task: {
                        url: this.taskUrl,
                        created: true
                    }
                }
            }
        } catch (err) {
            console.error(`[!] Failed to create a task: ${err.stack}`)
        }
        // Send a text
        try {
            const sms = new SMS();
            const result = await sms.send(ticket.phone, templates.acceptText);
            if (result) {
                ticket.status.notified = true;
            }
        } catch (err) {
            console.error(`[!] Failed to send a text:\n${err.stack}`)
        }
        // update ticket
        ticket.status.accepted = true
        await ticket.save()
        const response = {}
        if (ticket.status.task.created && ticket.status.notified) {
            response.status = "ok"
            response.taskUrl = ticket.status.task.url
        } else {
            response.status = "warning"
            response.message = `Something went wrong. Task created: ${(ticket.status.task.created ? "yes" : "no")}. SMS sent: ${(ticket.status.notified ? "yes" : "no")}`
        }
        return response;
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