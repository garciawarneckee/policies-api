const server = require("./server");

const clientRoutes = require("./src/clients/clients.routes");
const policiesRoutes = require("./src/policies/policy.routes");
const authRoutes = require("./src/routes/auth.routes");

server.use("/clients", clientRoutes);
server.use("/policies", policiesRoutes);
server.use("/auth", authRoutes);

server.listen(3000);
console.log("Server up and listening in port 3000");

module.exports = server;