const Joi = require('joi');

module.exports.chickensSchema = Joi.object({
  chicken: Joi.object({
    name: Joi.string().required().min(3).max(20),
    breed: Joi.string().required().min(3),
    imgUrl: Joi.string().required().min(3),
    weight: Joi.number().required().min(0),
    birthday: Joi.string()
  }).required()
})