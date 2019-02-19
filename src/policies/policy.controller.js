const policyService = require("./policy.service");
const clientService = require("../clients/client.service");

const ClientNotFoundError = require('../exceptions').ClientNotFoundError;
const ExternalServiceError = require('../exceptions').ExternalServiceError;

/**
 * Gets the policies by name and paginated.
 * @param {Request} req 
 * @param {Response} res 
 */
getByAllByName = async (req, res) => { 
  try {
    const { name, offset, quantity } = req.query; 
    const client = await clientService.getByName(name);
    const policies = await policyService.getAllByClientId(client.id, parseInt(offset), parseInt(quantity));
    res.send(policies);
  } catch(error) {
    switch(error.constructor) {
      case ClientNotFoundError || PolicyNotFoundError: res.send(404, error.message);
      case ExternalServiceError: res.send(500, error.message);
      default: res.send(500, error.message);
    }
  }  
}

module.exports = {
  getByAllByName
}

