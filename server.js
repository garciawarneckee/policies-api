const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const session = require("express-session");
const cors = require("cors");

const server = express();

server.use(
    cors({
      origin: ["http://localhost:3001"],
      credentials: true
    })
);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(helmet()); 
server.use(
  session({
    secret: "policies-api-session-secret",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: { secure: false },
    name: "id"
  })
);

module.exports = server;
