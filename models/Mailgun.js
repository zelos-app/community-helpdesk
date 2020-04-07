const axios = require('axios');

class Mailgun {
    constructor(email) {
        this.headers = {
            Authorization: `Basic ${new Buffer('api:' + process.env.MAILGUN_API_KEY).toString('base64')}`
        }
        this.params = {
            from: `${process.env.MAILGUN_FROM_NAME} <${process.env.MAILGUN_FROM_EMAIL}>`,
            to: email
        }
    }
    async send(subject, text) {
        this.params.subject = subject;
        this.params.text = text;
        axios.post(`${process.env.MAILGUN_BASE_URL}/${process.env.MAILGUN_DOMAIN}/messages`, null, {
            params: this.params,
            headers: this.headers
        })
    }
}

module.exports = Mailgun