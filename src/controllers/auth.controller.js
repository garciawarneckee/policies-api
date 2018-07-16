const loginService = require("../service/login.service");

exports.login = (req, res) => {
    const name = req.body.name;
    const email =  req.body.email; 
    loginService.login(name, email)
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
    res.status(401).send( { message: "Unauthorized"} );
}

exports.isLogged = (req, res) => {
    if(req.session.name && req.session.id && req.session.role) { 
        res.send({ isLogged: true });
    } else { 
        res.send(({ isLogged: false })); 
    }
}
