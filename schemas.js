const Joi = require('joi');

module.exports.eventSchema = Joi.object({
    event : Joi.object({
      title : Joi.string().required(),//should be a string and is required
      description : Joi.string().required(),
      price : Joi.number().required().min(0),//should be a number and is required
      location : Joi.string().required(),
      venue : Joi.string().required(),
      date : Joi.date().required(),
      time : Joi.string().required(),
      image  : Joi.string().required(),
    }).required()//event should be an object and it is required
});