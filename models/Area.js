const mongoose = require('mongoose');
const createError = require('http-errors');

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
        console.log(`[i] New area: ${newArea._id}`);
        return {
            id: newArea._id
        }
    }
    // Get all areas
    async list() {
        const result = await AreaModel.find();
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