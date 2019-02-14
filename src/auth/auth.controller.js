const authService = require("./auth.service");

const UnauthorizedError = require('../exceptions').UnauthorizedError;

//TODO: DOCUMENTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

login = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	try {
		const client = await authService.login(username, password);
		req.session.id = client.id;
		req.session.name = client.name;
		req.session.role = client.role;
		req.session.save(() => { });
		res.statusCode = 200;
		res.send({ isLogged: true, client: { id: client.id, name: client.name, role: client.role } });
	} catch (error) {
		switch (error.constructor) {
			case UnauthorizedError: res.status(401).send(error.message); break;
			default: res.status(500).send(error.message);
		}
	}

}

logout = (req, res) => {
	req.session.destroy((err) => { if (err) { delete req.session } });
	res.send({ message: "Logout successful" });
}

isLogged = (req, res) => {
	if (req.session.name && req.session.id && req.session.role) {
		res.send({ isLogged: true });
	} else {
		res.send(({ isLogged: false }));
	}
}

module.exports = {
	login,
	logout,
	isLogged
}