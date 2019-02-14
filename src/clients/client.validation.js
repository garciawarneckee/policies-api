const Joi = require('joi');

module.exports = {
  getByName: {
    query: {
      name: Joi.string().required()
    }
  },
  getById: {
    params: {
      id: Joi.string().required(),
    }
  },
  getByPolicyNumber: {
    params: {
      id: Joi.string().required()
    }
  }
}