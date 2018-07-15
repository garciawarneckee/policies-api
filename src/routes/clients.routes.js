const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client.controller");

router.get("/", clientController.getByName);

module.exports = router;