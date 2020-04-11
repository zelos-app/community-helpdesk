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
        approved: {
            isBoolean: true,
            optional: true
        },
        resolved: {
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
            isString: true,
            whitelist: {
                chars: "\\+0123456789"
            },
            matches: {
                pattern: new RegExp(`^\\+${process.env.PHONE_PREFIX}\\d\{${process.env.PHONE_MINLENGTH},${process.env.PHONE_MAXLENGTH}}\$`)
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