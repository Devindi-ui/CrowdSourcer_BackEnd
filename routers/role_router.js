const express = require('express');
const roles = require('../controllers/role_controller');
const router = express.Router();

router.post('/create', roles.createRole);

module.exports = router;