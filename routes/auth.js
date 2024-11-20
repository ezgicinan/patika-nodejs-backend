const express = require('express');
const authController = require('../controller/auth');  // Import without destructuring

const router = express.Router();

router.post('/login', authController.login);
router.get('/register', authController.register);

module.exports = router;