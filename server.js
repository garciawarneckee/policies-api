const express = require("express");
const connectMongo = require("connect-mongo");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const session = require("express-session");
const cors = require("cors");


//const MongoStore = connectMongo(ExpressSession);

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
/* app.use(
  session({
    secret: "policies-api-session-secret",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: { secure: false },
    store: new MongoStore({ url: "mongodb://localhost:27017/altran" }),
    name: "id"
  })
);
}); */

module.exports = server;
