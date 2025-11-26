const express = require('express');
const users = require('../controllers/user_controller');
const router = express.Router();

router.post('/create', users.createUser);

module.exports = router;         