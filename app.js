const server = require("./server");

const clientRoutes = require("./src/routes/clients.routes");
const policiesRoutes = require("./src/routes/policy.routes");
const authRoutes = require("./src/routes/auth.routes");

server.use("/clients", clientRoutes);
server.use("/policies", policiesRoutes);
server.use("/auth", authRoutes);

server.listen(3000);
console.log("Server up and listening in port 3000");