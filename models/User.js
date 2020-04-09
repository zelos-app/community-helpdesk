const mongoose = require('mongoose');
const createError = require('http-errors');
const Mailgun = require('./Mailgun');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,  
    status: {
        admin: Boolean,
        online: Boolean,
        registered: Boolean,
        archived: Boolean
    },
    credentials: {
        password: String,
        resetToken: String,
    }
});

const UserModel = mongoose.model('User', UserSchema)

// Generate auth token
generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, admin: this.admin }, process.env.PRIVATE_KEY);
    return token;
}

class User {
    constructor() {
    }

    // invite an user
    async add(email, admin = false) {
        const user = await UserModel.findOne({email: email})
        if (user === null) {
            const user = new UserModel();
            user.email = email;
            user.status.admin = admin;
            // create a password reset token
            user.credentials.resetToken = newToken();
            // email an invite
            if (process.env.SEND_INVITE_EMAIL) {
                const invite = new Mailgun(user.email);
                invite.send(`Invitation to ${process.env.APP_NAME}`, `Hello,\n\nYou have been invited to join the team at ${process.env.APP_DOMAIN}.\nGet started by finish creating your account at ${process.env.APP_URL}/confirm/${user.credentials.resetToken}`);
            }
            if (process.env.LOG_INVITE_CODE) {
                console.log(`[d] Invite token for ${user.email}: "${user.credentials.resetToken}"`);
            }
            const result = await user.save();
            return {
                id: result._id
            }
        } else {
            const err = createError(409, {
                status: "error",
                message: "User with email exists"
            });
            throw err;
        }      
    }

    // create an account
    async register(token, firstName, lastName, password) {
        const user = await UserModel.findOne({credentials: {resetToken: token}});
        if (user && !user.status.registered) {
            user.credentials.password = await bcrypt.hash(password, 10);
            user.firstName = firstName;
            user.lastName = lastName;
            // clear the reset token
            user.credentials.resetToken = "";
            user.status.registered = true;
            await user.save();
            return {
                status: "ok",
                message: "User created"
            }
        } else if (user && user.status.registered) {
            const err = createError(409, {
                status: "error",
                message: "User account exists"
            });
            throw err;
        } else {
            const err = createError(404, {
                status: "error",
                message: "Invalid token"
            });
            throw err;
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({email: email});
        if (user) {
            const match = await bcrypt.compare(password, user.credentials.password)
            if (match) {
                const token = jwt.sign({
                    _id: user._id,
                    admin: user.status.admin
                },
                process.env.PRIVATE_KEY,
                {
                    expiresIn: process.env.JWT_TTL,
                });
                const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
                console.log(payload)
                const result = {
                    token: token,
                    exp: payload.exp
                }
                return result;
            } else {
                const error = createError(401, {
                    status: "error",
                    message: "Password mismatch"
                });
                throw error
            }
        } else {
            const error = createError(404, {
                status: "error",
                message: "No user with this email"
            });
            throw error
        }
    }

    // update user details
    async update(id, fields) {
        try {
            const user = await this.init(id);
            for (const [key, value] of Object.entries(fields)) {
                user[key] = value;
            }
            await user.save();
            return {
                status: "ok"
            }
        } catch (err) {
            throw err;
        }
    }

    // request password reset
    async newReset(email) {
        try {
            const user = await UserModel.findOne({email: email})
            if (user && user.status.registered) {
                user.credentials.resetToken = newToken();
                const invite = new Mailgun(user.email);
                await invite.send(`Password reset`, `Hello,\n\nA password reset has been requested for your account at ${process.env.APP_DOMAIN}.\nYou can set a new password here: ${process.env.APP_URL}/reset/${user.credentials.resetToken}\n\nIf you didn't ask for this reset you can safely ignore this letter`);
                user.save();
            } else if (user && !user.status.registered) {
                console.log(`[w] Got Password reset request for non-activated account: ${email}`);
            } else {
                console.log(`[w] Got Password reset request for non-existing email: ${email}`);
            }
        } catch (err) {

        }
    }

    // check reset token
    async checkToken(token) {
        const user = await UserModel.findOne({credentials: {resetToken: token}});
        if (user) {
            return {
                status: "ok"
            }
        } else {
            const err = createError(404, {
                status: "error",
                message: "Invalid token"
            });
            throw err;
        }
    }

    // reset user password
    async reset(token) {
        const user = await UserModel.findOne({credentials: {resetToken: token}});
        if (user) {
            user.credentials.password = await bcrypt.hash(password, 10);
            // clear the reset token
            user.credentials.resetToken = ""
            await user.save();
            return {
                status: "ok",
                message: "Password updated"
            }
        } else {
            const err = createError(404, {
                status: "error",
                message: "Invalid token"
            });
            throw err;
        }
    }

    // list all users
    async list(limit=100, skip=0) {
        const users = await UserModel.find({}, null, {
            skip: skip,
            limit: limit
        });
        const result = {
            count: {}
        };
        result.count.returned = users.length;
        result.count.total = await UserModel.estimatedDocumentCount();
        result.users = users.map(user => {
            user = user.toObject();
            delete user.credentials;
            return user;
        });
        result.settings = {
            limit: limit,
            skip: skip,
        }
        return result;
    }
    
    // get user details as an object
    async get(id) {
        const user = await UserModel.findById(id);
        if (user) {
            const userObj = user.toObject();
            delete userObj.credentials;
            return userObj;
        } else {
            const err = createError(404, {
                status: "error",
                message: "Not found"
            });
            throw err;
        }
    }

    // get user model with data
    async init(id) {
        const user = await UserModel.findById(id);
        if (user) {
            return user;
        } else {
            const err = createError(404, {
                status: "error",
                message: "Not found"
            });
            throw err;
        }
    }

    async getUserByField(fields) {
        const user = await UserModel.findOne(fields);
        if (user) {
            return user;
        } else {
            return false;
        }
    }


    // search for users
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

    // create default user
    async initDefault() {
        const user = await this.getUserByField({email: process.env.ADMIN_EMAIL});
        if (!user.status.registered) {
            const user = new UserModel();
            const password = process.env.ADMIN_PASSWORD
            user.email = process.env.ADMIN_EMAIL
            user.firstName = "Default";
            user.lastName = "Admin";
            user.status.admin = true;
            user.status.registered = true;
            user.credentials.password = await bcrypt.hash(password, 10);
            console.log(`[i] Created default user`)
            await user.save();
        }
    }
}

function newToken() {
    const token = crypto.createHash('md5').update(`${Date.now() + Math.floor(Math.random() * 10000)}`).digest("hex");
    return token;
}

module.exports = User