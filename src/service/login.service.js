const clientService = require("./client.service");

exports.login = async (name, password) => {
    const client = await clientService.getByNameAndEmail(name, password);
    if(client === undefined) { return false; }  else { return client; }
}