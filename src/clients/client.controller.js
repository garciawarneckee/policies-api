const clientService = require("./client.service");
const policyService = require("../policies/policy.service");

const ClientNotFoundError = require('../exceptions').ClientNotFoundError;
const PolicyNotFoundError = require('../exceptions').PolicyNotFoundError;

//TODO DOCUMENTATION!!!

getById = async (req, res) => {
	try {
		const id = req.params.id;
		const client = await clientService.getById(id);
		 res.send(client);
	} catch(error) {
		switch (error.constructor) {
			case ClientNotFoundError: res.status(404).send(error.message); break;
			default: res.status(500).send(error.message);
		}
	}
	
}

getByName = async (req, res) => {
	try {
		const name = req.query.name;
		const client = await clientService.getByName(name);
		res.send(client);
	} catch (error) {
		res.status(404).send(error);
	}
}

getByPolicyNumber = async (req, res) => {
	try {
		const id = req.params.id;
		const policy = await policyService.getById(id);
		const client = await clientService.getById(policy.clientId);
		res.send(client);
	} catch (error) {
		switch (error.constructor) {
			case PolicyNotFoundError:
			case ClientNotFoundError: res.status(404).send(error.message); break;
			default: res.status(500).send(error.message);
		}
	}
}

module.exports = {
	getById,
	getByName,
	getByPolicyNumber
}