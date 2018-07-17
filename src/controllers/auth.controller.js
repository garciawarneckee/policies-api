const loginService = require("../service/login.service");

exports.login = (req, res) => {
    let username, password;
    if(!req.body.username || !req.body.password) {
        res.sendStatus(400);
        return;
    } else {
        username = req.body.username;
        password = req.body.password;
    }
    loginService.login(username, password)
        .then((client) => {
            if(!client){
                res.status(401).send({ message: "Unauthorized" });
                return;
            } else {
                req.session.id = client.id;
                req.session.name = client.name;
                req.session.role = client.role;
                req.session.save(() => {});
                res.statusCode = 200;
                res.send({ isLogged: true, client: { id: client.id, name: client.name, role: client.role } });
            }
        });
}

exports.logout = (req, res) => {
    req.session.destroy((err) => { if(err) { delete req.session } });
    res.send( { message: "Logout successful" } );
}

exports.isLogged = (req, res) => {
    if(req.session.name && req.session.id && req.session.role) { 
        res.send({ isLogged: true });
    } else { 
        res.send(({ isLogged: false })); 
    }
}
