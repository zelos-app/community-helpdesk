const mongoose = require('mongoose');
const createError = require('http-errors');
const Zelos = require('./Zelos')

const areaSchema = new mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: String,
    status: {
        archived: {
            type: Boolean,
            default: false
        },
        zelos: {
            group: {
                Type: Boolean,
                default: false
            },
            groupId: String
        }
    }
});

const AreaModel = mongoose.model('area', areaSchema);

class Area {
    constructor(id) {
        this.data = {}
        this.id = id;
    }
    // Add a new area
    async add(fields) {
        for (const [key, value] of Object.entries(fields)) {
            this.data[key] = value;
        }
        // todo: fields.createdBy = current user
        const area = new AreaModel(this.data);
        const newArea = await area.save();
        const response = {
            id: newArea._id
        }
        // create or link a group on Zelos
        const zelos = new Zelos();
        await zelos.init();
        const group = await zelos.findGroup(fields.name);
        if (!group) {
            try {   
                const groupId = await zelos.newGroup(fields.name, fields.desc);
                if (groupId) {
                    response.status = "ok"
                    response.zelosGroupId = groupId;
                    response.message = "Added area and created a new group on Zelos"
                } else {
                    response.status = "warning"
                    response.message = "Added area, but failed to create group on Zelos (limit reached or no permission to add groups)"
                }
            } catch (err) {
                console.log(err)
            }       
        } else {
            response.status = "ok"
            response.message = "Added area and linked an existing group on Zelos"
        }
        return response
    }
    // Get all areas
    async list(consumer) {
        const result = await AreaModel.find();
        if (consumer === "public") {
            const list = result.map(el => {
                if (!el.status.archived) {
                        const area = {
                        name: el.name,
                        _id: el._id
                    }
                return area;
                }
            })
            return list;
        }
        return {
            status: "ok",
            areas: result
        }
    }

    // Get a single area
    async get() {
        const area = await AreaModel.findById(this.id);
        return area;
    }

    // Update area
    async update(fields) {
        for (const [key, value] of Object.entries(fields)) {
            this.data[key] = value;
        }
        await AreaModel.updateOne({
            _id: this.id
        }, {
            ...this.data
        });
        return {
            status: "ok",
            message: "Updated",
            fields: {
                ...this.data
            }
        }
    }

    // Remove a area
    async delete() {
        console.log(`[d] Trying to remove area "${this.id}"`);
        const res = await AreaModel.deleteOne({
            _id: this.id
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
    }
}
module.exports = Area;