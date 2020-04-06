const axios = require('axios');
const {ConfigModel} = require('./Config');


function isTokenValid(exp) {
    now = Math.floor(new Date().getTime() / 1000)
    if (now > exp) {
        return false;
    } else {
        return true;
    }
}

class Zelos {
    constructor() {
        this.url = `https://${process.env.ZELOS_WORKSPACE}.zelos.space`;
        this.credentials = {
            email: process.env.ZELOS_USER_EMAIL,
            password: process.env.ZELOS_USER_PASSWORD
        }
        this.tokens = {}
    }
    async init() {
        const config = await ConfigModel.findOne();
        console.log(`[d] Config: ${config}`)
        if (config && config.zelos && config.zelos.tokens) {
            console.log(`[d] Found Zelos config`);
            this.tokens = config.zelos.tokens;
            if (isTokenValid(this.tokens.access.expired_at)) {
                console.log(`[d] Access token is valid`);
            } else if (isTokenValid(this.tokens.refresh.expired_at)) {
                console.log(`[d] Requesting new access token`);
                await this.getAccessToken();
            } else {
                console.log(`[d] Re-authenticating`);
                await this.login();
            }
        } else {
            console.log(`[d] No Zelos tokens found, initializing`);
            await this.login();
        }
        config.zelos = {
            tokens: this.tokens
        }
        await config.save(); // remove await?
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.tokens.access.token}`;
        const status = await axios.get(`${this.url}/api/status`);
        console.log(`[i] Authenticated to "${status.data.event_name}"`);
    }
    async login() {
        const res = await axios.post('https://app.zelos.space/api/auth', this.credentials);
        this.tokens = res.data.data;
    }
    async getAccessToken() {
        const res = await axios.put('https://app.zelos.space/api/auth', {
            refresh_token: this.tokens.refresh.token
        });
        this.tokens = res.data.data;
    }
    async getTasks() {
        const res = await axios.get(`${this.url}/api/task`);
        this.tasks = res.data.data;
        console.log(`[i] Found ${this.tasks.length} tasks`)
    }
    async getGroups(name = "") {
        const res = await axios.get(`${this.url}/api/group`);
        this.groups = res.data.data;
        console.log(`[i] Loaded ${this.groups.length} groups`);
    }

    async findGroup(name) {
        let url = `${this.url}/api/group?name=${name}`;
        url = encodeURI(url);
        const res = await axios.get(url);
        if (res.data.data == "") {
            return "";
        } else {
            const group = res.data.data
            return group[0].data.id
        }
    }

    async newTask(details, groups = []) {
        let name = ""
        const description = details.description
        if (description.length > 255) {
            name = `${description.substring(0,252)}...`
        } else {
            name = description
        }
        const instruction = []
        Object.keys(details).forEach(item => {
            if (item === "phone" || item === "address" || item === "name") {
                instruction.push(`${item.capitalize()}: ${details[item]}`)
            }
        });
        // add critical instructions
        instruction.push(config.instructions);
        const body = {
            "type": "regular",
            "name": `${name}`,
            "description": `${description}`,
            "instructions": `${instruction.join('\n')}`,
            "execution_start_date": null,
            "execution_end_date": null,
            "points": 1,
            "publish_at": null,
            "active_until": null,
            "images": [],
            "assignment_approve_needed": true,
            "completion_approve_needed": false,
            "max_participants_amount": 1,
            "groups": groups,
            "location_id": null,
            "user_ids": []
        }
        try {
            const res = await axios.post(`${this.url}/api/task/regular`, body)
            const taskUrl = this.url + "/tasks/" + res.data.data.id;
            console.log(`[i] Created ${taskUrl}`);
            return taskUrl;
        } catch (err) {
            console.error(`[!] Failed to create task: ${err.message}`)
            return err;
        }

    }
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

module.exports = Zelos;