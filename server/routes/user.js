const express = require('express');
const controllers = require('../controllers/user');
const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

router.get('/', authenticateUser, controllers.getUser);

module.exports = router;
