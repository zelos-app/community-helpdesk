const axios = require('axios');
const Config = require(`./Config`);

class Infobip {
    constructor() {
        this.baseUrl = process.env.INFOBIP_BASE_URL;
        this.apiKey = process.env.INFOBIP_API_KEY;
    }
    async init() {
        const config = new Config();
        const settings = await config.get("sms");
        this.sender = settings.fromName;
        this.axiosConfig = {
            headers: {
                Authorization: `App ${this.apiKey}`
            }
        }
    }

    async send(number, text) {
        await this.init();
        const req = {};
        req.messages = [];
        req.messages.push({
            "from": this.sender,
            "destinations": [{
                "to": number
            }],
            "text": text
        })
        try {
            await axios.post(`${this.baseUrl}`, req, this.axiosConfig);
            return true;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Infobip;