const createError = require('http-errors');
const phoneRegex = RegExp(process.env.PHONE_REGEX);

// function body(req) {
//     let schema;
//     if (req.method === "POST") {
//         schema = Joi.object({
//             name: Joi.string().min(3).max(64).required(),
//             phone: Joi.string().regex(phoneRegex).required(),
//             area: Joi.string(), //TODO: match area ID
//             address: Joi.string().max(256),
//             request: Joi.string().max(512).required(),
//             type: Joi.string() //TODO: match type ID
//         });
//         return validate(schema, req.body)
//     } else if (req.method === "PUT") {
//         schema = Joi.object({
//             name: Joi.string().min(3).max(64),
//             phone: Joi.string().regex(phoneRegex),
//             area: Joi.string(), //TODO: match area ID
//             address: Joi.string().max(256),
//             request: Joi.string().max(512),
//             type: Joi.string(), //TODO: match type ID
//             status: Joi.object({
//                 accepted: Joi.boolean(),
//                 rejeceted: Joi.boolean(),
//                 solved: Joi.boolean(),
//                 archived: Joi.boolean(),
//                 notified: Joi.boolean()
//             })
//         });
//         return validate(schema, req.body)
//     }
// }

// function params(req) {
//     console.log(`[d] Validating params: ${JSON.stringify(req.params)}`);
//     let schema;
//     if (req.path.match(/^\/api\/tickets\/.+$/)) {
//         console.log(`[d] Validating param schema for path /api/tickets/:id`);
//         schema = Joi.object({
//             id: Joi.string().pattern(/^\w{24}$/).required()
//         })
//     }
//     const result = validate(schema, req.params);
//     return result.id;
// }

// function query(req) {
//     console.log(`[d] Validating query: ${JSON.stringify(req.query)}`);
//     let schema;
//     if (req.method === "GET") {
//         if (req.path.match(/^\/api\/tickets\/*$/)) {
//             console.log(`[d] Validating query schema for path /api/tickets`);
//             schema = Joi.object({
//                 limit: Joi.number().min(1).max(1000),
//                 skip: Joi.number(),
//                 phone: Joi.string().regex(phoneRegex),
//                 area: Joi.string().pattern(/^\w{24}$/),
//                 type: Joi.string().pattern(/^\w{24}$/),
//                 status: Joi.object({
//                     task: Joi.object({
//                         created: Joi.boolean(),

//                     }),
//                     created: Joi.boolean(),
//                     accepted: Joi.boolean(),
//                     rejected: Joi.boolean(),
//                     solved: Joi.boolean(),
//                     archived: Joi.boolean(),
//                     notified: Joi.boolean()
//                 })
//             }).required();
//         }
//     }
//     return validate(schema, req.query);
// }

// function id(id) {
//     if (id.match(/^\w{24}$/)) {
//         return id;
//     } else {
//         const response = {
//             status: "error",
//             message: `Bad ID`
//         }
//         throw response;
//     }
// }


// function validate(schema, obj) {
//     const validation = schema.validate(obj, { errors: {escapeHtml: true}});
//     if ("error" in validation) {
//         const error = createError(400, {
//             status: "error",
//             message: `${validation.error.details[0].message}`
//         });
//         throw error
//     } else {
//         console.log(`[d] Returning validation.value: ${JSON.stringify(validation.value)}`);
//         return validation.value;
//     }
// }

// module.exports = {
//     body,
//     id,
//     query,
//     params
// };