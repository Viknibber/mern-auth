const express = require('express');
const controllers = require('../controllers/auth');
const schemas = require('../schemas/auth');

const router = express.Router();

router.get('/', controllers.refresh);

router.post('/login', schemas.login, controllers.login);
router.post('/register', schemas.register, controllers.register);

module.exports = router;
