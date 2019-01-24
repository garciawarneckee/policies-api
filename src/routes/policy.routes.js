const express = require("express");
const router = express.Router();

const policyController = require("../controllers/policy.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", [authMiddleware.isAdmin, policyController.getByAllByName]);

module.exports = router;