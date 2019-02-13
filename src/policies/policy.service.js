const axios = require("axios");
const config = require("../../config");

const GetAllPoliciesError = require('../exceptions').GetAllPoliciesError;
const PaginationError = require('../exceptions').PaginationError;
const ExternalServiceError = require('../exceptions').ExternalServiceError;
const PolicyNotFoundError = require('../exceptions').PolicyNotFoundError;

/**
 * Retrieves all the policies by the client identification.
 * @param { Number } id unique client identification.
 * @param { Number } offset starting index to display elements.
 * @param { Number } quantity number of elements per page.
 * @return a page of policies.
 */
getAllByClientId = async (id, offset, quantity) => {
	try {
		const response = await axios.get(config.policiesEndpoint);
		const data = response.data;
		policies = data.policies.filter(p => p.clientId == id);
		const page = buildPage(policies, offset, quantity);
		return page;
	} catch (error) {
		throw new GetAllPoliciesError("An error has happend trying to get the policies");
	}
}

/**
 * Retrieves a single policy by its id.
 * @param { Number } id policy unique identification.
 * @return a policy.
 */
getById = async (id) => {
	try {
		const response = await axios.get(config.policiesEndpoint);
		const data = response.data;
		const policy = data.policies.find(p => p.id == id);
		if(!policy) { throw new PolicyNotFoundError(`Policy with id ${id} does not exist.`) }
		return policy;
	} catch(error) {
		switch(error.constructor) {
			case PolicyNotFoundError: throw new PolicyNotFoundError(error.message); break;
			defualt: throw new ExternalServiceError(error.message);  
		}
	}

}
/**
 * Builds a data structure that has a slice of the total data and pagination data.
 * @param { Object } data objects to be parsed.
 * @param { Number } offset starting index to display elements.
 * @param { Number } pageSize number of elements per page.
 * @return pagination data structure.
 */
buildPage = (data, offset, pageSize) => {
	if (!data) { throw new PaginationError("There is no data to build a page"); }
	const contentData = data.slice(offset, offset + pageSize);
	return { content: contentData, offset: offset, quantity: pageSize };
}

module.exports = {
	getAllByClientId,
	getById
};