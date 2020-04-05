const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    zelos: Object
}, {
    strict: false
});

const ConfigModel = mongoose.model('Config', configSchema)

class Config {
    constructor() {

    }
    async init() {
        const config = await ConfigModel.findOne();
        if (config) {
            console.log(`[d] Config found in the database`);
        } else {
            console.log(`[d] No config found, initializing`);
            const config = new ConfigModel()
            await config.save();
        }
    }
}

module.exports = {
    ConfigModel,
    Config
}