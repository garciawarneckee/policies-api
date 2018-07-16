const policyService = require("../service/policy.service");
const clientService = require("../service/client.service");

/**
 * Gets the policies by name and paginated.
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getByAllByName = async (req, res) => { 
  const name = (req.query.name) ? req.query.name : res.sendStatus(400);
  const offset = (req.query.offset) ? req.query.offset : res.sendStatus(400);
  const quantity = (req.query.quantity) ? req.query.quantity : res.sendStatus(400);

  const client = await clientService.getByName(name);
  
  if(!client) { 
    res.status(404).send({ message: "Client not found" }); 
    return; 
  }
  
  const policies = await policyService.getAllByClientId(client.id, offset, quantity);

  res.send( policies );
}

