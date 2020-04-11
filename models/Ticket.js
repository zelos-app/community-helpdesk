const mongoose = require('mongoose');
const createError = require('http-errors');
const Area = require(`./Area`);
const Zelos = require(`./Zelos`);
const SMS = require(`./${process.env.SMS_PROVIDER}`);
const Config = require(`./Config`);

const config = new Config();

const activitySchema = new mongoose.Schema({
    time: {type: Date, default: Date.now()},
    action: String,
    source: {
        system: Boolean,
        user: mongoose.ObjectId,
    }
})

const commentSchema = new mongoose.Schema({
    time: {type: Date, default: Date.now()},
    comment: String,
    creator: {
        system: Boolean,
        id: mongoose.ObjectId
    }
})

const ticketSchema = new mongoose.Schema({
    name: String,
    phone: String,
    area: mongoose.ObjectId,
    address: String,
    request: String,
    category: mongoose.ObjectId,
    owner: mongoose.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    comments: [commentSchema],
    status: {
        rejected: Boolean,
        approved: Boolean,
        resolved: Boolean,
        archived: Boolean,
        notified: Boolean,
        task: {
            created: Boolean,
            url: String
        }
    },
    activity: [activitySchema]
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
    async add(fields, owner) {
        for (const [key, value] of Object.entries(fields)) {
            this.data[key] = value;
        }
        this.data.owner = owner;
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

    // Resolve a ticket
    async resolve(comment) {
        const ticket = await this.get();
        if (ticket.status && !(ticket.status.approved || ticket.status.resolved)) {
            if (comment) {
                this.addComment(comment, req.user._id)
            }
            ticket.status.solved = true;
            this.activity.push({
                action: "Ticket marked as resolved 👏",
                source: {
                    user: owner
                }
            })
            await ticket.save();
        } else {
            const err = createError(409, {
                status: "error",
                message: "Conflicting statuses",
                status: ticket.status
            });
            throw err;
        }
    }

    // Reject a ticket
    async reject(comment, user, notify) {
        const ticket = await this.get();
        if (ticket.status && !(ticket.status.approved || ticket.status.resolved)) {
            // Add a comment if requested
            if (comment && user) {
                this.addComment(comment, user)
            }
            ticket.status.rejected = true;
            ticket.activity.push({
                action: "Ticket rejected",
                source: {
                    user: ticket.owner
                }
            })
            // Send a text
            const sendText = (notify !== "false");
            try {
                if (sendText && process.env.SEND_REJECT_TEXT) {
                    console.log(`[d] Sending reject message`);
                    const sms = new SMS();
                    const templates = await config.get("templates");
                    const result = await sms.send(ticket.phone, templates.rejectText);
                    if (result) {
                        ticket.status.notified = true;
                    }
                } else {
                    ticket.status.notified = false
                    console.log(`[d] Skipping reject message. Global: ${process.env.SEND_REJECT_TEXT}. Query: ${notify}`)
                }
            } catch (err) {
                console.error(`[!] Failed to send a text:\n${err.stack}`)
            }
            // Update ticket
            await ticket.save();
            return {status: "ok", message: "Ticket rejected"}
        } else {
            const err = createError(409, {
                status: "error",
                message: "Conflicting statuses",
                status: ticket.status
            });
            throw err;
        }
    }

    // Approve a ticket
    async approve(query) {
        const ticket = await this.get();
        if (ticket.status && ticket.status.approved) {
            const err = createError(409, {
                status: "error",
                message: "Conflicting statuses",
                status: ticket.status
            });
            throw err;
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
            console.error(`[!] Failed to create a task:\n${err.stack}`)
        }
        // Send a text
        const sendText = (query.notify !== "false");
        try {
            if (sendText) {
                console.log(`sending a text`)
                const sms = new SMS();
                const result = await sms.send(ticket.phone, templates.acceptText);
                if (result) {
                    ticket.status.notified = true;
                }
            }
        } catch (err) {
            console.error(`[!] Failed to send a text:\n${err.stack}`)
        }
        // update ticket
        ticket.status.accepted = true
        ticket.save()
        const response = {}
        if (ticket.status.task.created && (ticket.status.notified || !sendText)) {
            response.status = "ok"
            response.taskUrl = ticket.status.task.url
        } else {
            response.status = "warning"
            response.message = `Something went wrong. Task created: ${(ticket.status.task.created ? "yes" : "no")}. SMS sent: ${(ticket.status.notified ? "yes" : "no")}`
        }
        return response;
    }

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