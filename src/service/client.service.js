const axios = require("axios");
const config = require("../../config");

exports.getByName = async (name) => {
    const response = await axios.get(config.clientsEndpoint);
    const data = response.data;
    client = data.clients.find( c => c.name == name );
    return client;
}

/**
 * 
 * @param {string} id 
 * @returns a client. If there is not client it will return 'undefined'.
 */
exports.getById = async (id) => {
    const response = await axios.get(config.clientsEndpoint);
    const data = response.data;
    client = data.clients.find( c => c.id === id );
    return client;
}