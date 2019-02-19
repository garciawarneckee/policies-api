const express = require('express');
const validation = require('express-validation');
const router = express.Router();

const authController = require('./auth.controller');
const authValidation = require('./auth.validation');
const authMiddleware = require('./auth.middleware');

router.post('/login', validation(authValidation.login), authController.login);
router.post('/logout', [authMiddleware.isUserOrAdmin, authController.logout]);
router.get('/me', [authMiddleware.isUserOrAdmin, authController.getLoggedUser]);

module.exports = router;