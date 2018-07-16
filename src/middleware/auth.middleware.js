exports.isUserOrAdmin = (req, res, next) => {
    if(!req.session) {
        res.status(401).send({ message: "Unauthorized" })
        return;
    } 

    if(req.session.role === "user" && req.session.role === "admin") {
        next();
    } else {
        res.status(403).send({ message: "Forbidden" });
    }
}

exports.isAdmin = (req, res, next) => {
    if(!req.session) {
        res.status(401).send({ message: "Unauthorized" })
        return;
    } 

    if(req.session.role === "admin") {
        next();
    } else {
        res.status(403).send({ message: "Forbidden" });
    }

}