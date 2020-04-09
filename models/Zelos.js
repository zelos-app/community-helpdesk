const axios = require('axios');
const Config = require('./Config');

const cfg = new Config();

class Zelos {
    constructor() {
        this.url = `https://${process.env.ZELOS_WORKSPACE}.zelos.space`;
        this.credentials = {
            email: process.env.ZELOS_USER_EMAIL,
            password: process.env.ZELOS_USER_PASSWORD
        }
        this.tokens = {}
        this.axiosConfig = {
            headers: {}
        };
    }
    async init() {
        const cfg = new Config();
        const config = await cfg.get('zelos', true);
        if (config.tokens) {
            this.tokens = config.tokens;
            if (isTokenValid(this.tokens.access.expired_at)) {
                console.log(`[d] Zelos: Access token is valid`);
            } else if (isTokenValid(this.tokens.refresh.expired_at)) {
                console.log(`[d] Zelos: Requesting new access token`);
                this.tokens = await this.getAccessToken();
                saveTokens(config, this.tokens);
            } else {
                console.log(`[d] Zelos: Re-authenticating`);
                this.tokens = await this.login();
                saveTokens(config, this.tokens);
            }
        } else {
            console.log(`[d] Zelos: no tokens found, initializing`);
            this.tokens = await this.login();
            saveTokens(config, this.tokens);
        }

        this.axiosConfig.headers = {
            Authorization: `Bearer ${this.tokens.access.token}`
        }
        const status = await axios.get(`${this.url}/api/status`);
        console.log(`[i] Authenticated to "${status.data.event_name}"`);
    }

    async login() {
        const res = await axios.post('https://app.zelos.space/api/auth', this.credentials);
        const tokens = res.data.data;
        return tokens
    }
    async getAccessToken() {
        const res = await axios.put('https://app.zelos.space/api/auth', {
            refresh_token: this.tokens.refresh.token
        });
        const tokens = res.data.data;
        return tokens;
    }
    async getTasks() {
        const request = {
            headers: this.axiosConfig.headers
        }
        const res = await axios.get(`${this.url}/api/task`, request);
        this.tasks = res.data.data;
        console.log(`[i] Found ${this.tasks.length} tasks`)
    }
    async getGroups() {
        try {
            const request = {
                headers: this.axiosConfig.headers
            }
            const res = await axios.get(`${this.url}/api/group`, request);
            this.groups = res.data.data;
            console.log(`[i] Loaded ${this.groups.length} groups`);
        } catch (err) {
            console.error(err);
            throw err
        }

    }

    async findGroup(name) {
        let url = `${this.url}/api/group?name=${name}`;
        url = encodeURI(url);
        const request = {
            headers: this.axiosConfig.headers
        }
        const res = await axios.get(url, request);
        if (res.data.data == "") {
            return null;
        } else {
            const group = res.data.data
            return group[0].data.id
        }
    }
    async newGroup(name, desc, closed = false, secret = false, noScore = true) {
        const config = {
            headers: this.axiosConfig.headers,
        }
        const data = {
            name: name,
            description: desc,
            closed: closed,
            secret: secret,
            hide_from_scoreboards: noScore
        }
        try {
            const res = await axios.post(`${this.url}/api/group`, data, config);
            return res.data.data.id;
        } catch (err) {
            console.log(err.response);
            if (err.response.status = 403) {
                return null;
            }
        }
    }

    async newTask(details) {
        let name = ""
        const description = details.publicFields.request
        if (description.length > 255) {
            name = `${description.substring(0,252)}...`
        } else {
            name = description
        }
        // parse instructions
        const instructions = []
        Object.keys(details.privateFields).forEach(item => {
            if (item === "phone" || item === "address" || item === "name") {
                instructions.push(`${item.capitalize()}: ${details.privateFields[item]}`)
            } else {
                instructions.push("\n" + details.privateFields[item])
            }
        });
        // parse settings
        const defSetting = await cfg.get('zelos');
        const confirmAssignment = details.settings.confirmAssignment ? details.settings.confirmAssignment : defSetting.confirmAssignment
        const confirmCompletion = details.settings.confirmCompletion ? details.settings.confirmCompletion : defSetting.confirmCompletion
        // prepare request body
        const body = {
            "type": "regular",
            "name": name,
            "description": description,
            "instructions": instructions.join('\n'),
            "execution_start_date": null,
            "execution_end_date": null,
            "points": 1,
            "publish_at": null,
            "active_until": null,
            "images": [],
            "assignment_approve_needed": Boolean(confirmAssignment),
            "completion_approve_needed": Boolean(confirmCompletion),
            "max_participants_amount": 1,
            "groups": [details.settings.group],
            "location_id": null,
            "user_ids": []
        }
        // console.log(body)
        const axiosCfg = {
            headers: this.axiosConfig.headers,
        }
        try {
            const res = await axios.post(`${this.url}/api/task/regular`, body, axiosCfg);
            const taskUrl = this.url + "/tasks/" + res.data.data.id;
            console.log(`[i] Created ${taskUrl}`);
            return taskUrl;
        } catch (err) {
            console.error(`[!] Failed to create task: ${err.message}`)
            return err.message;
        }
    }
}

function isTokenValid(exp) {
    now = Math.floor(new Date().getTime() / 1000)
    if (now > exp) {
        return false;
    } else {
        return true;
    }
}

function saveTokens(config, tokens) {
    config.zelos = {
        tokens: tokens
    }
    config.save();
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

module.exports = Zelos;