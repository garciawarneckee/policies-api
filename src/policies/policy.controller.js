const policyService = require("./policy.service");
const clientService = require("../clients/client.service");

/**
 * Gets the policies by name and paginated.
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getByAllByName = async (req, res) => { 
  try {
    const { name, offset, quantity } = req.query; 
    const client = await clientService.getByName(name);
    const policies = await policyService.getAllByClientId(client.id, parseInt(offset), parseInt(quantity));
    res.send(policies);
  } catch(error) {
    res.status(404).send(error.message);
  }  
}

