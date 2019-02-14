const axios = require("axios");
const config = require("../../config");

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
		switch(error.constructor) {
			case PaginationError: throw error;
			default: throw new ExternalServiceError('An error has happend trying to get the policies');
		}
		
	}
}

/**
 * Retrieves a single policy by its id.
 * @param { Number } id policy unique identification.
 * @throws { PolicyNotFoundError } if there is not policy with the provided id.
 * @throws { ExternalServiceError } if there is an error while fetching the external data.
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
			case PolicyNotFoundError: throw error;
			default: throw new ExternalServiceError('An error has happend trying to get the policies');  
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
	if (!data) { throw new PaginationError('There is no data to build a page'); }
	const contentData = data.slice(offset, offset + pageSize);
	return { 
		content: contentData, 
		offset: offset, 
		quantity: pageSize, 
		elementsInPage: contentData.length,
		total: data.length
	 };
}

module.exports = {
	getAllByClientId,
	getById
};