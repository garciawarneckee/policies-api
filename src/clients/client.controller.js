const clientService = require("./client.service");
const policyService = require("../policies/policy.service");

const ClientNotFoundError = require('../exceptions').ClientNotFoundError;
const PolicyNotFoundError = require('../exceptions').PolicyNotFoundError;

/**
 * Gets a client by his id.
 * @throws { ClientNotFoundError } if there is not client that matches the provided id.
 * @throws { Error } if there is another unexpected error not related to the business
 */
getById = async (req, res) => {
	try {
		const id = req.params.id;
		const client = await clientService.getById(id);
		res.send(client);
	} catch (error) {
		switch (error.constructor) {
			case ClientNotFoundError: res.status(404).send(error.message); break;
			default: res.status(500).send(error.message);
		}
	}
}

/**
 * Gets a client by his name.
 * @throws { ClientNotFoundError } if there is not client that matches the provided name.
 * @throws { Error } if there is another unexpected error not related to the business
 */
getByName = async (req, res) => {
	try {
		const name = req.query.name;
		const client = await clientService.getByName(name);
		res.send(client);
	} catch (error) {
		switch (error.constructor) {
			case ClientNotFoundError: res.status(404).send(error.message);
			default: res.status(500).send(error.message);
		}
	}
}
/**
 * Gets the client data related to a policy indentifier.
 * @throws { PolicyNotFoundError } if there is not policy that matches the provided id.
 * @throws { ClientNotFoundError } if there is not client that matches the provided id.
 * @throws { Error } if there is another unexpected error not related to the business
 */
getByPolicyNumber = async (req, res) => {
	try {
		const id = req.params.id;
		const policy = await policyService.getById(id);
		const client = await clientService.getById(policy.clientId);
		res.send(client);
	} catch (error) {
		switch (error.constructor) {
			case PolicyNotFoundError:
			case ClientNotFoundError: res.status(404).send(error.message);
			default: res.status(500).send(error.message);
		}
	}
}

/**
 * Retrieves a client by the provided criteria.
 * @throws { ClientNotFoundError } if there is not client that matches the provided criteria.
 * @throws { Error } if there is another unexpected error not related to the business.
 * @returns a client.
 */
search = (req, res) => {
	try {
		const criteria = req.query.criteria;
		const result = clientService.search(criteria);
		res.send({ client: result });
	} catch(error) {
		switch (error.constructor) {
			case ClientNotFoundError: res.status(404).send(error.message);
			default: res.status(500).send(error.message);
		}
	}
	
}

module.exports = {
	getById,
	getByName,
	getByPolicyNumber,
	search
}