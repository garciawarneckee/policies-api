const server = require("./server");
const clientController = require("./src/controllers/client.controller");
const clientRoutes = require("./src/routes/clients.routes");

server.use("/clients", clientRoutes);

server.listen(3000);
console.log("Server up and listening in port 3000");