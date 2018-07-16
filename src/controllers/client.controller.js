const clientService = require("../service/client.service");
const policyService = require("../service/policy.service");

exports.getByName = async (req, res) => { 
  if(req.query.name) {
    const name = req.query.name;
    const client = await clientService.getByName(name);
    if(client === undefined) { res.sendStatus(404); } else { res.send(client); }

  } else { res.sendStatus(400); }
}

exports.getById = async (req, res) => { 
  const id = (req.params.id) ? req.params.id : res.sendStatus(400)
  const client = await clientService.getById(id);
  if(client === undefined) { res.sendStatus(404); } else { res.send(client); }
}

exports.getByPolicyNumber = async (req, res) => {
  if(req.params.id) {
    const id = req.params.id;
    const policy = await policyService.getById(id);
    
    if(!policy) { 
      res.status(404).send({ message: "Policy not found" }); 
      return;
    } 
    
    const client = await clientService.getById(policy.clientId);
    if(client === undefined) {
      res.status(404).send({ message: "Client not found" });
    } 
    else { res.send(client); }
  
  } else {
    res.sendStatus(400);
  } 
  
}
