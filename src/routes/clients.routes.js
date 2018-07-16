const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client.controller");

router.get("/:id", clientController.getById);
router.get("/", clientController.getByName);
router.get("/policy/:id", clientController.getByPolicyNumber);

module.exports = router;