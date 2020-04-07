const mongoose = require('mongoose');

const localeSchema = new mongoose.Schema({
    locale: String,
    texts: {
        publicForm: {
            landing: {
                title: String,
                body: String,
                offerHelpButton: String,
                needHelpButton: String
            },
            selectCategory: {
                title: String,
                body: String
            },
            writeRequest: {
                title: String,
                prompt: String,
                nextButton: String
            }          
        },
    }
}, {
    strict: false,
    minimize: false
});

const LocaleModel = mongoose.model('Locale', localeSchema)

class Locale {
    constructor(locale) {
        this.locale = locale;
    }
    async init() {
        const config = await ConfigModel.findOne();
        if (config) {
            console.log(`[d] Existing locale loaded`);
        } else {
            console.log(`[d] No locale found, initializing`);
            const locale = new ConfigModel()
        }
    }
}
