const config = require("../../config");
const jwt = require('jsonwebtoken');

const tokenBlacklist = require('../../database').tokenBlackListIndex;
const UnauthorizedError = require('../exceptions').UnauthorizedError;

const jwtSecret = process.env.JWT_SECRET_KEY;

isUserOrAdmin = (req, res, next) => {
	if (!config.enableSecurityMiddleware) { 
		next(); 
		return;
	}
	try {
		checkToken(req, res, next);
		(hasRoleUserOrAdmin(req.decoded.client)) ? next() : res.send(403, { message: 'Forbidden' });
	} catch (error) {
		res.send(401, { message: error.message });
	}
}

isAdmin = (req, res, next) => {
	if (process.env.NODE_ENV === 'mocha') { 
		next(); 
		return;
	}
	try {
		checkToken(req, res, next);
		(hasRoleAdmin(req.decoded.client)) ? next() : res.send(403, { message: 'Forbidden' });
	} catch (error) {
		res.send(401, { message: error.message });
	}
}

hasRoleUserOrAdmin = (client) => { return client && (hasRoleUser(client) || hasRoleAdmin(admin)); }

hasRoleUser = (client) => { return client && (client.role === 'user') }

hasRoleAdmin = (client) => { return client && (client.role === 'admin') }


/**
 * Verifies if token format is OK and if is not present in the local of blacklist tokens.
 */
checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token.startsWith('Bearer ')) { token = token.slice(7, token.length); }

	if (token && (tokenBlacklist.search(token) !== false)) { 
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) { throw new UnauthorizedError('The provided token is not valid'); } 
			else {
				req.decoded = decoded;
			}
		});
	}
	else { 
		throw new UnauthorizedError('Not provided token'); 
	}
}

module.exports = {
	isUserOrAdmin,
	isAdmin
}