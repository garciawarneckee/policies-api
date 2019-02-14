const express = require('express');
const validation = require('express-validation');
const router = express.Router();

const policyController = require('./policy.controller');
const policyValidation = require('./policy.validation');
const authMiddleware = require('../auth/auth.middleware');


router.get("/", [authMiddleware.isAdmin, validation(policyValidation.getAllByName), policyController.getByAllByName]);

module.exports = router;