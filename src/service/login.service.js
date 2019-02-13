const clientService = require("../clients/client.service");

exports.login = async (name, password) => {
    const client = await clientService.getByNameAndEmail(name, password);
    return client || false;
}