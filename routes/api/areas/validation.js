const validation = {
    newArea: {
        name: {
            isString: true,
            escape: true,
            trim: true
        },
        description: {
            isString: true,
            escape: true,
            trim: true,
            optional: true,
        },
        noGroup: {
            isBoolean: true,
            optional: true
        }
    }
}

module.exports = validation;