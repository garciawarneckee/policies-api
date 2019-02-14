const express = require('express');
const validation = require('express-validation');
const router = express.Router();

const clientController = require('./client.controller');
const clientValidation = require('./client.validation');

const authMiddleware = require('../auth/auth.middleware');

router.get("/:id", [authMiddleware.isUserOrAdmin, validation(clientValidation.getById), clientController.getById]);
router.get("/", [authMiddleware.isUserOrAdmin, validation(clientValidation.getByName), clientController.getByName]);
router.get("/policy/:id", [authMiddleware.isAdmin, validation(clientValidation.getByPolicyNumber), clientController.getByPolicyNumber]);

module.exports = router;