const Joi = require('joi');

module.exports = {
  getAllByName : {
    query: {
      name: Joi.string().required(),
      offset: Joi.number().required(),
      quantity: Joi.number().required()
    }
  }
}

