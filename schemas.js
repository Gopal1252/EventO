const Joi = require('joi');

// const BaseJoi = require('joi');
// const sanitizeHtml = require('sanitize-html');

// const extension = (joi) => ({
//     type: 'string',
//     base: joi.string(),
//     messages: {
//         'string '{{#label}} must not include HTML!'
//     },
//     rules: {
//     {
//             validate(value, helpers) {
//                 const clean = sanitizeHtml(value, {
//                     allowedTags: [],
//                     allowedAttributes: {},
//                 });
//                 if (clean !== value) return helpers.error('string { value })
//                 return clean;
//             }
//         }
//     }
// });

// const Joi = BaseJoi.extend(extension)

module.exports.eventSchema = Joi.object({
    event : Joi.object({
      title : Joi.string().required(),//should be a string and is required
      description : Joi.string().required(),
      price : Joi.number().required().min(0),//should be a number and is required
      location : Joi.string().required(),
      venue : Joi.string().required(),
      date : Joi.date().required(),
      time : Joi.string().required(),
    //   image  : Joi.string().required(),
    }).required(),//event should be an object and it is required
    deleteImages: Joi.array()
});

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        body : Joi.string().required()
    }).required()
});