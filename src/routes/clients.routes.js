const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/:id", [authMiddleware.isAdmin, clientController.getById]);
router.get("/", clientController.getByName);
router.get("/policy/:id", clientController.getByPolicyNumber);

module.exports = router;