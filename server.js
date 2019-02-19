const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

const server = express();

dotenv.config();

server.use(
    cors({
      origin: ["http://localhost:3001"],
      credentials: true
    })
);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(helmet());

module.exports = server;
