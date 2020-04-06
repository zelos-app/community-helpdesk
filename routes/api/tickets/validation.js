const validation = {
    listTickets: {
        task: {
            isBoolean: true,
            optional: true
        },
        rejected: {
            isBoolean: true,
            optional: true
        },
        accepted: {
            isBoolean: true,
            optional: true
        },
        solved: {
            isBoolean: true,
            optional: true
        },
        archived: {
            isBoolean: true,
            optional: true
        },
        notified: {
            isBoolean: true,
            optional: true
        },
        createdAt: {
            isISO8601: true,
            optional: true
        },
        name: {
            trim: true,
            escape: true,
            optional: true
        },
        phone: {
            isInt: true,
            trim: true,
            isLength: {
                min: process.env.PHONE_MINLENGTH,
                max: process.env.PHONE_MAXLENGTH
            },
            optional: true
        },
        area: {
            isMongoId: true,
            optional: true
        },
        type: {
            isMongoId: true,
            optional: true
        }
    }
}

module.exports = validation;