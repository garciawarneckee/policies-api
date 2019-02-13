const axios = require("axios");
const config = require("../../config");

const ExternalServiceError = require('../exceptions').ExternalServiceError;
const ClientNotFoundError = require('../exceptions').ClientNotFoundError;

//this.getClients = this.getClients.bind(this);

/**
 * Retrieves a client by its name.
 * @param { String } name the name of the client.
 * @throws { ClientNotFoundError } if the client is not found in the clients data.
 * @throws { ExternalServiceError } if the client dat could not be retrieved.
 * @returns the client info.
 */
getByName = async (name) => {
	try {
		const data = await getClients();
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
 * @throws { ClientNotFoundError } if the client is not found in the clients data.
 * @throws { ExternalServiceError } if the client dat could not be retrieved.
 * @returns the client info.
 */
getById = async (id) => {
	try {
		const data = await getClients();
		client = data.clients.find(c => c.id === id);
		if(client) { return client; }
		else { throw new ClientNotFoundError(`There is no client with name ${id}`); }
	} catch(error) {
		switch (error.constructor) {
			case ClientNotFoundError: throw new ClientNotFoundError(error.message); break;
			default: throw new ExternalServiceError(error.message);
		}
	}
}

/**
 * Returns a client for the given name and email. If there is no client it gonna throw an error showing up the scenario.
 * @param { String } id unique identification of a client
 * @throws { ClientNotFoundError } if the client is not found in the clients data.
 * @throws { ExternalServiceError } if the client dat could not be retrieved.
 * @returns the client info.
 */
getByNameAndEmail = async (name, email) => {
	try {
		const data = await getClients();
		client = data.clients.find(c => c.name == name && c.email == email);
		if(client) { return client; }
		else { throw new ClientNotFoundError(`There is no client for the given data`); }
	} catch(error) {
		throw error;
	}
}

/**
 * Gets the clients info from external service.
 * @throws { ExternalServiceError } if the client dat could not be retrieved.
 * @returns clients info.
 */
getClients = async () => {
	try {
		const response = await axios.get(config.clientsEndpoint);
		return response.data;
	} catch (error) {
		throw new ExternalServiceError(error.message);
	}
}

module.exports = {
	getByName,
	getById,
	getByNameAndEmail
}