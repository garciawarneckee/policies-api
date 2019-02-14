const clientService = require('../clients/client.service');

const ClientNotFoundError = require('../exceptions').ClientNotFoundError;
const UnauthorizedError = require('../exceptions').UnauthorizedError;

//TODO: DOCUMENTAAAAAAAAAAAAAAAAAAAA

login = async (name, password) => {
	try {
		const client = await clientService.getByNameAndEmail(name, password);
		return client;
	}catch(error) {
		switch(error.constructor) {
			case ClientNotFoundError: throw new UnauthorizedError(`There is not matching user for the provided credentials`);
			default: throw error;
		}
	}
}

module.exports = { login };