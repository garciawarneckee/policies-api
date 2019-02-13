const axios = require("axios");
const config = require("../../config");

const ExternalServiceError = require('../exceptions').ExternalServiceError;
const ClientNotFoundError = require('../exceptions').ClientNotFoundError;

exports.getByName = async (name) => {
	try {
		const response = await axios.get(config.clientsEndpoint);
		const data = response.data;
		const client = data.clients.find(c => c.name == name);
		if(client) { return client; }
		else { throw new ClientNotFoundError(`There is no client with name ${name}`); }
	} catch(error) {
		throw new ExternalServiceError(error.message);
	}
    
}

/**
 * Returns a client for the given identification. If there is no client it gonna throw an error showing up the scenario.
 * @param { String } id unique identification of a client
 * @returns a client.
 */
exports.getById = async (id) => {
	try {
		const response = await axios.get(config.clientsEndpoint);
		const data = response.data;
		client = data.clients.find(c => c.id === id);
		return client;
	} catch(error) {
		throw new ClientNotFoundError(`There is no client with id ${id}`);
	}
}

exports.getByNameAndEmail = async (name, email) => {
	const response = await axios.get(config.clientsEndpoint);
	const data = response.data;
	client = data.clients.find(c => c.name == name && c.email == email);
	return client;
}
