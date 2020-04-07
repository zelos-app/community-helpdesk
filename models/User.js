const mongoose = require('mongoose');
const createError = require('http-errors');
const Mailgun = require('./Mailgun');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,  
    status: {
        invited: {type: Boolean, default: true},
        admin: Boolean,
        online: Boolean,
        registered: Boolean,
        archived: Boolean
    }
});

const UserModel = mongoose.model('User', userSchema)

class User {
    constructor() {
    }

    async add(email, admin = false) {
        const user = await UserModel.find({email: email})
        if (user.length === 0) {
            // const user = new UserModel();
            // user.email = email;
            // user.status.admin = admin;
            // const newUser = await user.save();
            // email an invite
            const invite = new Mailgun(email);
            await invite.send("Testing mailgun", "Yes hello");
            return {
                // id: newUser._id
            }
        } else {
            const err = createError(409, {
                status: "error",
                message: "User with email exists"
            });
            throw err;
        }      
    }

    async list(limit=100, skip=0) {
        const users = await UserModel.find({}, null, {
            skip: skip,
            limit: limit
        });
        const result = {
            count: {}
        };
        result.count.returned = users.length;
        result.count.total = await UsertModel.estimatedDocumentCount();
        result.users = users;
        result.settings = {
            limit: limit,
            skip: skip,
        }
        return result;
    }
    
    async get(id) {
        const user = await UserModel.findById(this.id);
        if (user) {
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.isAdmin = user.isAdmin;
        } else {
            const err = createError(404, {
                status: "error",
                message: "Not found"
            });
            throw err;
        }
    }

    async find(fields = {}) {
        if (fields) {
            let result;
            const users = await UserModel.find({fields});
            if (users) {
                result = {
                    status: "ok",
                    users: users
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
}

module.exports = User