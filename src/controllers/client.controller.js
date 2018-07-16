const clientService = require("../service/client.service");
const policyService = require("../service/policy.service");

exports.getByName = async (req, res) => { 
  const name = (req.query.name) ? req.query.name : res.sendStatus(400)
  const client = await clientService.getByName(name);
  res.send( { client: client } );
}

exports.getById = async (req, res) => { 
  const id = (req.params.id) ? req.params.id : res.sendStatus(400)
  const client = await clientService.getById(id);
  if(client === undefined) { res.sendStatus(404); } else { res.send( { client: client }); }
}

exports.getByPolicyNumber = async (req, res) => {
  const id = (req.params.id) ? req.params.id : res.sendStatus(400)
  const policy = await policyService.getById(id);
  if(!policy) { 
    res.status(404).send({ message: "Policy not found" }); 
    return;
  } 
  const client = await clientService.getById(policy.clientId);
  if(client === undefined) {
    res.status(404).send({ message: "Client not found" });
  } else {
    res.send({ client: client });
  }
}
