const authService = require("./auth.service");

const UnauthorizedError = require('../exceptions').UnauthorizedError;

login = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	try {
		const token = await authService.login(username, password);
		res.json({ token: token });
	} catch (error) {
		switch (error.constructor) {
			case UnauthorizedError: res.status(401).send(error.message);
			default: res.status(500).send(error.message);
		}
	}
}

logout = (req, res) => {
	const token = req.body.token;
	authService.logout(token);
	res.sendStatus(200);
}

getLoggedUser = (req, res) => {
	let token = req.headers['authorization'];
	token = token.slice(7, token.length);
	const user = authService.getLoggedUser(token);
	res.json(user);
}

module.exports = {
	login,
	logout,
	getLoggedUser
}