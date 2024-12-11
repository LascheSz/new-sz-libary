const express = require('express'),
router = express.Router(),
{ register, login } = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);

module.exports = router;

