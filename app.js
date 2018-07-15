const server = require("./server");
const clientController = require("./src/controllers/client.controller");

server.get("/", clientController.getByName);

server.listen(3000);
console.log("Server up and listening in port 3000");