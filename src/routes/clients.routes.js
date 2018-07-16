const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/:id", [authMiddleware.isUserOrAdmin, clientController.getById]);
router.get("/", [authMiddleware.isUserOrAdmin, clientController.getByName]);
router.get("/policy/:id", [authMiddleware.isAdmin, clientController.getByPolicyNumber]);

module.exports = router;