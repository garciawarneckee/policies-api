const config = require("../../config");

exports.isUserOrAdmin = (req, res, next) => {
    if (!config.enableSecurityMiddleware) {
        next();
        return;
    }
    if(!(req.session.id && req.session.name && req.session.role)) {
        res.status(401).send({ message: "Unauthorized" })
        return;
    } 

    if(req.session.role === "user" || req.session.role === "admin") {
        next();
    } else {
        res.status(403).send({ message: "Forbidden" });
    }
}

exports.isAdmin = (req, res, next) => {
    if (process.env.NODE_ENV === 'mocha'){
        next();
        return;
    }
    if(!(req.session.id && req.session.name && req.session.role)) {
        res.status(401).send({ message: "Unauthorized" })
        return;
    } 

    if(req.session.role === "admin") {
        next();
    } else {
        res.status(403).send({ message: "Forbidden" });
    }

}