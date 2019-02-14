const express = require('express');
const validation = require('express-validation');
const router = express.Router();

const authController = require('./auth.controller');
const authValidation = require('./auth.validation');

router.post('/login', validation(authValidation.login), authController.login);
router.post('/logout', authController.logout);
router.get('/isLogged', authController.isLogged);

module.exports = router;