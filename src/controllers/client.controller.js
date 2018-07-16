const clientService = require("../service/client.service");

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
