const clientService = require('../clients/client.service');
const tokenBlacklist = require('../../database').tokenBlackListIndex;
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;

const ClientNotFoundError = require('../exceptions').ClientNotFoundError;
const UnauthorizedError = require('../exceptions').UnauthorizedError;
const UnexpectedError = require('../exceptions').UnexpectedError;


/**
 * Wraps the login logic, first check if the user exsist and then create a bearer token for it. 
 * @param { String } name username.
 * @param { String } password secured word.
 * @returns { Object } authorization token.
 * @throws { UnauthorizedError } mean that provided credentials are not valid.
 * @throws { ? extends Error } some other error which is translated to an internal server error.
 */
login = async (name, password) => {
	try {
		const client = await findUserByNameAndPassword(name, password);
		return jwt.sign(
			{ client }, 
			secretKey, 
			{ expiresIn: '1h' });
	} catch(error) {
		switch(error.constructor) {
			case ClientNotFoundError: throw new UnauthorizedError(`There is not matching user for the provided credentials`);
			default: {
				console.error(error.message);
				throw new UnexpectedError('An unexpected error happend during the execution, please try again');
			};
		}
	}	
}

logout = (token) => {
	const refs = tokenBlacklist.search(token);
	if (refs[0]) { return tokenBlacklist.documentStore.addDoc(refs[0].ref); }
}

/**
 * Looks for a user. If there is a client retrieves it, in other case throws an error to be handled in the main method.
 * @param { String } name username.
 * @param { String } password secured word.
 * @returns { Client } user data for the requested user.
 * @throws { ? extends Error } error to be handled.
 */
findUserByNameAndPassword = async (name, password) => {
	try {
		return await clientService.getByNameAndEmail(name, password);
	} catch(error) {
		throw error;
	}
}

getLoggedUser = (token) => {
	return jwt.decode(token);
}

module.exports = { 
	login,
	logout,
	getLoggedUser
};