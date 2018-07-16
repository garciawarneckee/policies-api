const policyService = require("../service/policy.service");
const clientService = require("../service/client.service");

exports.getByAllByName = async (req, res) => { 
  const name = (req.query.name) ? req.query.name : res.sendStatus(400);
  
  //Get the client
  const client = await clientService.getByName(name);
  if(!client) { 
    res.status(404).send({ message: "Client not found" }); 
    return; 
  }
  
  const policies = await policyService.getAllByClientId(client.id);

  res.send( { policies: policies } );
}
