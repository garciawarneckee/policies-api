const server = require("./server");

const clientRoutes = require("./src/routes/clients.routes");
const policiesRoutes = require("./src/routes/policy.routes");

server.use("/clients", clientRoutes);
server.use("/policies", policiesRoutes);

server.listen(3000);
console.log("Server up and listening in port 3000");

module.exports = server;